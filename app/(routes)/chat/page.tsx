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
      text: "Hello! I'm your AI assistant. How can I help you today? Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.Sorry, I couldn't process your request.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

    try {
      const response = await fetch("http://192.168.72.241:5000/chat", {
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

  // Function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex min-h-[90dvh] flex-col ">
      <div className="flex h-[calc(100vh-58px)] flex-col pb-10">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
          style={{ height: "calc(100% - 76px)" }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col space-y-4 px-4 py-6 md:px-6">
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
                      className={`group flex max-w-[85%] items-start space-x-2 ${
                        message.sender === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          message.sender === "user"
                            ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User size={18} />
                        ) : (
                          <span className="text-xs font-semibold">{"</>"}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div
                          className={`rounded-lg px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                              : ""
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm">
                            {message.text}
                          </p>
                        </div>
                        <span className="mt-1 text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center items-center justify-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                      <span className="text-xs font-semibold">{"</>"}</span>
                    </div>
                    <div className="flex space-x-1 rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        {/* Input form with fixed height and always visible */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <div className="mx-auto max-w-3xl">
            <motion.form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-lg bg-white opacity-80 backdrop-blur-sm dark:bg-gray-800"></div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Stuck in recursion? Let’s unwind 🚀"
                  className="relative w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  aria-label="Message input"
                />
              </div>
              <div className="relative">
                <button
                  type="submit"
                  className="relative flex items-center justify-center rounded-lg bg-gray-600 p-3 text-white transition-colors hover:bg-gray-700 disabled:pointer-events-none disabled:opacity-75"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                >
                  {"~>"}
                </button>
              </div>
            </motion.form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
