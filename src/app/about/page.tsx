"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const aboutText = `I'm a web designer and graphics editor with expertise in Adobe Photoshop, CSS, HTML, and C. I'm also a proficient video editor using Adobe Premiere Pro, and a quick learner always seeking new challenges to further develop my skills. My attention to detail and commitment quality me to deliver unique and innovative solutions to any project.`;

type CommandMap = { [key: string]: (string | React.ReactNode)[] };
const commands: CommandMap = {
  help: [
    "Available commands:",
    "about - Show about me info",
    "photo - Show my photo",
    "clear - Clear the terminal",
    "theme - Toggle dark/light mode"
  ],
  about: [aboutText],
  photo: [<Image key="photo" src="/hero.jpg" alt="Pankaj Bhatta" width={220} height={260} className="rounded-lg object-cover border-2 border-[#f6eedc] mx-auto my-4" />],
};

export default function AboutTerminal() {
  const [history, setHistory] = useState([
    "Welcome to PankajOS! Type 'help' to get started."
  ]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    let output: any = [];
    if (cmd === "clear") {
      setHistory([]);
      return;
    } else if (cmd === "theme") {
      setTheme(theme === "dark" ? "light" : "dark");
      output = [
        `Theme switched to ${theme === "dark" ? "light" : "dark"}.`
      ];
    } else if (commands[cmd]) {
      output = commands[cmd];
    } else {
      output = [
        `Command not found: ${cmd}. Type 'help' for available commands.`
      ];
    }
    setHistory((h) => [...h, `> ${cmd}`, ...output]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 ${theme === "dark" ? "bg-[#181816]" : "bg-[#f6eedc]"}`}>
      <div className={`w-full max-w-2xl rounded-xl shadow-lg border border-[#222] p-0 overflow-hidden ${theme === "dark" ? "bg-[#181816]" : "bg-[#f6eedc]"}`}>
        <div className={`px-4 py-2 flex items-center border-b border-[#222] ${theme === "dark" ? "bg-[#23223a]" : "bg-[#f6eedc]"}`}>
          <span className="font-mono font-bold text-lg" style={{ color: theme === "dark" ? "#fff" : "#181816" }}>PankajOS Terminal</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-auto rounded px-3 py-1 text-sm font-bold border border-[#888]"
            style={{ background: theme === "dark" ? "#23223a" : "#fff", color: theme === "dark" ? "#fff" : "#23223a" }}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="p-4 min-h-[400px] font-mono text-base" style={{ color: theme === "dark" ? "#f6eedc" : "#181816" }}>
          {history.map((line, idx) => (
            <div key={idx} className="mb-1">{line}</div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="mr-2 text-green-400">$</span>
            <input
              ref={inputRef}
              className={`flex-1 bg-transparent outline-none border-none font-mono text-base ${theme === "dark" ? "text-[#f6eedc]" : "text-[#181816]"}`}
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
