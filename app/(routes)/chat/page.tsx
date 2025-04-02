"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, User } from "lucide-react";
import axios from "axios";
import Image from "next/image";
interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const TRANSLITERATION_LANGS = [
  "hi",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "pa",
  "ml",
  "kn",
];
const LANGUAGES = [
  { code: "hi", label: "Hindi" },
  { code: "en", label: "English" },
  { code: "bn", label: "Bengali" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
  { code: "pa", label: "Punjabi" },
  { code: "ml", label: "Malayalam" },
  { code: "kn", label: "Kannada" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function transliterateText(
    text: string,
    lang: string,
  ): Promise<string> {
    if (!TRANSLITERATION_LANGS.includes(lang)) return text;
    try {
      const response = await axios.get(
        "https://inputtools.google.com/request",
        {
          params: {
            itc: `${lang}-t-i0-und`,
            num: 1,
            ie: "utf-8",
            oe: "utf-8",
            text: text,
          },
        },
      );
      return response.data[1][0][1][0];
    } catch (error) {
      console.warn(`Transliteration failed for ${lang}:`, error);
      return text;
    }
  }

  async function translateText(
    text: string,
    targetLang: string,
  ): Promise<string> {
    try {
      const response = await axios.get(
        "https://translate.googleapis.com/translate_a/single",
        {
          params: {
            client: "gtx",
            sl: "auto",
            tl: targetLang,
            dt: "t",
            q: text,
          },
        },
      );
      return response.data[0].map((t: any) => t[0]).join("");
    } catch (error) {
      console.error("Translation failed:", error);
      return text;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const transliteratedText = await transliterateText(
      inputValue,
      selectedLang,
    );
    const translatedToEnglish = await translateText(transliteratedText, "en");

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    console.log(translatedToEnglish);
    //return;
    try {
      const response = await fetch("http://192.168.31.108:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: translatedToEnglish }),
      });

      const data = await response.json();
      let aiResponse = data.response;
      const finalTranslation = await translateText(aiResponse, selectedLang);

      const aiMessage: Message = {
        id: messages.length + 2,
        text: finalTranslation,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Sorry, I couldn't process your request.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
      animate={{ opacity: 1 }}
      className="relative mx-auto flex h-[100dvh] max-w-4xl flex-col px-4 py-0 md:h-[70vh]"
    >
      <div className="absolute right-4 top-4 z-10">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="rounded border bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-950"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pb-20 pt-20 md:pt-16">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] items-center space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`flex h-10 w-12 items-center justify-center rounded-full border border-gray-600 p-2 dark:border-slate-700 dark:bg-slate-950 md:w-10 ${message.sender === "user" ? "bg-gray-700 text-white" : "bg-white"}`}
                >
                  {message.sender === "user" ? (
                    <User size={20} />
                  ) : (
                    <>{"</>"}</>
                  )}
                </div>
                <div
                  className={`rounded-lg border border-gray-600 p-3 dark:border-slate-700 dark:bg-slate-950 ${message.sender === "user" ? "bg-gray-700 text-white" : "bg-white"}`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 right-0 flex w-full bg-transparent p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex w-full gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="w-full flex-1 rounded-lg border bg-white p-3 focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-700 p-3 text-white hover:bg-gray-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950"
            disabled={!inputValue.trim() || isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
