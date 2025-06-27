"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const terminalFont = {
  fontFamily: 'JetBrains Mono, Fira Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

const sections: Record<string, string[]> = {
  about: [
    "Hi, I'm Pankaj!",
    "I'm a full-stack developer, terminal lover, and comic UI fan.",
    "Type 'ls' to see available sections or 'exit' to close."
  ],
  experience: [
    "Experience:",
    "- Software Engineer at XYZ Corp",
    "- Built cool web apps and terminal UIs",
    "Type 'ls' to see more or 'exit' to close."
  ],
  skills: [
    "Skills:",
    "- JavaScript, Python, Java, AWS, Linux, Docker",
    "- React, Next.js, Tailwind CSS, Firebase",
    "Type 'ls' to see more or 'exit' to close."
  ]
};

const commands: Record<string, string> = {
  ls: "about  experience  skills",
  "cd about": "about",
  "cd pankaj-experience": "experience",
  "cd skills": "skills",
};

export default function TerminalDetail({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const [history, setHistory] = useState<string[]>(["Do you want to know more about me? (y/n)"]);
  const [input, setInput] = useState("");
  const [section, setSection] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleCommand = (cmd: string) => {
    if (!section) {
      if (cmd.trim().toLowerCase() === "y") {
        setSection("about");
        setHistory((h) => [...h, "> y", ...sections.about]);
      } else {
        setHistory((h) => [...h, "> " + cmd, "Okay, exiting…"]);
        setTimeout(onClose, 1200);
      }
      return;
    }
    if (cmd === "ls") {
      setHistory((h) => [...h, "> ls", commands.ls]);
    } else if (commands[cmd]) {
      const key = commands[cmd];
      setSection(key);
      setHistory((h) => [...h, "> " + cmd, ...sections[key]]);
    } else if (cmd === "exit") {
      setHistory((h) => [...h, "> exit", "Exiting…"]);
      setTimeout(onClose, 1200);
    } else {
      setHistory((h) => [...h, "> " + cmd, "Command not found: " + cmd]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-xl shadow-2xl p-0 max-w-2xl w-full relative"
        style={{ background: "#18181b", border: "4px solid #39ff14", ...terminalFont }}
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <button
          className="absolute top-3 right-4 text-neon-green text-2xl font-bold hover:scale-125 transition-transform z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-6 min-h-[320px] text-lg text-neon-green" style={terminalFont}>
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-line animate-typing-terminal">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-neon-green mr-2" style={terminalFont}>&gt;</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none text-neon-green flex-1 text-lg animate-blink-cursor"
              style={terminalFont}
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              autoComplete="off"
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
} 