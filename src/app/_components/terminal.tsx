"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CORRECT_ANSWER = "git clone https://github.com/lbtm/example";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const isVisible = errorCount > 0;
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  // Submit goes to the level selector
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (input.trim() !== CORRECT_ANSWER) {
      setErrorCount((count) => count + 1);
      setInput("");
      return;
    }

    router.push(`/level-selector`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div
        className={`absolute bottom-8 right-16 transform rounded-xl bg-gray-900 px-6 py-4 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        Having some trouble? <br /> Paste this command:{" "}
        <p className="text-green-400">{CORRECT_ANSWER}</p>
      </div>
      <div
        className="coding inverse-toggle overflow-hidden rounded-lg bg-gray-900 px-4 pb-6 pt-4
              font-mono  text-sm leading-normal text-gray-100 subpixel-antialiased shadow-lg"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-orange-300"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mt-4 flex w-full">
          <span className="text-green-400">computer:~$</span>
          <form onSubmit={handleSubmit} className="grow">
            <input
              className="w-full bg-transparent pl-2 outline-none"
              autoFocus
              value={input}
              onChange={handleChange}
            />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    </div>
  );
}
