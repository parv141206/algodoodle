import { FC, ReactNode, useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

interface Props {
  algorithmName: string;
}

const AlgorithmCodeBlock: FC<Props> = ({ algorithmName }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`/images/code/${algorithmName}.c`);
        const data = await response.text();
        if (data) {
          setCode(data);
          setIsLoading(false);
        } else {
          setCode("// Code not found");
        }
      } catch (error) {
        console.error("Error fetching code:", error);
        setCode("// Error fetching code");
      }
    };

    fetchCode();
  }, [algorithmName]);
  return (
    <>
      <div id="code"></div>
      <div className="text-3xl font-bold">Code</div>
      <br />
      {isLoading ? (
        <div className="text-3xl font-bold">Loading...</div>
      ) : (
        <div className="flex flex-col  rounded-lg bg-[#282a36]">
          <div className="flex w-full flex-row items-center justify-between gap-1 p-5 ">
            <div className="flex gap-1">
              <div className="h-5 w-5 rounded-full bg-red-500"></div>
              <div className="h-5 w-5 rounded-full bg-yellow-500"></div>
              <div className="h-5 w-5 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-xl font-bold text-white">C</div>
          </div>
          <CodeBlock
            language="c"
            theme={dracula}
            text={code}
            showLineNumbers={true}
          />
        </div>
      )}
    </>
  );
};

export default AlgorithmCodeBlock;
