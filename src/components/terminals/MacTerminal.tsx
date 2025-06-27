"use client";
import React, { useState, useRef, useEffect } from "react";
import cvData from '../../data/cvData';

export default function MacTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to macOS Terminal",
    "Type help for available commands",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `% ${cmd}`];
    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help");
        newHistory.push("  % projects");
        newHistory.push("  % skills");
        newHistory.push("  % education");
        newHistory.push("  % experience");
        newHistory.push("  % certifications");
        newHistory.push("  % languages");
        newHistory.push("  % about");
        break;
      case "% projects":
        newHistory.push("Projects:");
        newHistory.push(...[
          "  • Anywhere AI (https://anywhere-ai.vercel.app/landing)",
          "  • Portfolio Website, Website on Github",
          "  • School Website (www.laa.edu.np)",
          ""
        ]);
        break;
      case "% skills":
        newHistory.push("Technical Skills:");
        newHistory.push(...cvData.skills.technical.map(skill => `  • ${skill}`));
        newHistory.push("");
        newHistory.push("Soft Skills:");
        newHistory.push(...cvData.skills.soft.map(skill => `  • ${skill}`));
        newHistory.push("");
        break;
      case "% education":
        newHistory.push("Education:");
        newHistory.push(...cvData.education.map(e => `  • ${e.level} at ${e.institution}${e.major ? `, Major: ${e.major}` : ''}${e.cgpa ? `, CGPA: ${e.cgpa}` : ''}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.year ? `, Year: ${e.year}` : ''}`));
        newHistory.push("");
        break;
      case "% experience":
        newHistory.push("Experience:");
        newHistory.push(...cvData.experience.map(e => `  • ${e.title}${e.details ? `: ${e.details.join('; ')}` : ''}`));
        newHistory.push("");
        break;
      case "% certifications":
        newHistory.push("Certifications:");
        newHistory.push(...cvData.certifications.map(cert => `  • ${cert}`));
        newHistory.push("");
        break;
      case "% languages":
        newHistory.push("Languages:");
        newHistory.push(...cvData.languages.map(l => `  • ${l.name} (${l.level})`));
        newHistory.push("");
        break;
      case "% about":
        newHistory.push("About Me:");
        newHistory.push("Pankaj Bhatta");
        newHistory.push("Kathmandu, Nepal");
        newHistory.push("");
        newHistory.push("Aspiring Computer Scientist and developer, passionate about technology, teaching, and community service.");
        newHistory.push("Winner of GDSC ULM Hawkathon 2025, Databricks Certified Generative AI Engineer, and experienced in web development, teaching, and volunteering.");
        newHistory.push("Always eager to learn, collaborate, and make a positive impact!");
        newHistory.push("");
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        newHistory.push("Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures  Public");
        break;
      case "pwd":
        newHistory.push("/Users/pankaj");
        break;
      case "whoami":
        newHistory.push("pankaj");
        break;
      default:
        newHistory.push(`zsh: command not found: ${cmd}`);
    }
    newHistory.push("");
    setHistory(newHistory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border-2 border-terminal bg-[#1e1e1e] shadow-lg flex flex-col min-h-[200px] sm:min-h-[240px] md:min-h-[260px] font-mono terminal-zoom" 
         style={{ fontFamily: 'SF Mono, JetBrains Mono, Menlo, Monaco, Consolas, monospace' }}>
      {/* Mac title bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#232323] border-b border-terminal">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block"></span>
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block"></span>
        <span className="ml-3 sm:ml-4 text-xs sm:text-sm font-bold text-white tracking-widest">Terminal — zsh</span>
      </div>
      <div className="flex-1 p-3 sm:p-4 text-white text-sm sm:text-base flex flex-col justify-end overflow-y-auto">
        {history.map((line, idx) => <div key={idx}>{line}</div>)}
        <div className="flex items-center">
          <span className="text-accent-blue text-sm sm:text-base">pankaj@macbook ~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="ml-2 bg-transparent border-none outline-none text-white flex-1 font-mono text-sm sm:text-base"
            spellCheck="false"
            autoComplete="off"
          />
          <button
            type="button"
            className="ml-0.5 p-2 rounded bg-accent-blue text-white block sm:hidden flex items-center justify-center"
            onClick={() => { handleCommand(input); setInput(""); }}
            aria-label="Enter command"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-4-4 4 4-4 4"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Add this to globals.css:
// .animate-typing { animation: typing 2.5s steps(30, end) 1; }
// @keyframes typing { from { width: 0 } to { width: 100% } } 