"use client";
import React, { useState, useRef, useEffect } from "react";
import cvData from '../../data/cvData';
import Image from 'next/image';

export default function LinuxTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Linux Terminal",
    "Type help for available commands",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `$ ${cmd}`];
    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help");
        newHistory.push("  ls projects");
        newHistory.push("  ls skills");
        newHistory.push("  ls education");
        newHistory.push("  ls experience");
        newHistory.push("  ls certifications");
        newHistory.push("  ls languages");
        newHistory.push("  ls about");
        break;
      case "ls projects":
        newHistory.push("Projects:");
        newHistory.push(...[
          "  • Anywhere AI (https://anywhere-ai.vercel.app/landing)",
          "  • Portfolio Website, Website on Github",
          "  • School Website (www.laa.edu.np)",
          ""
        ]);
        break;
      case "ls skills":
        newHistory.push("Technical Skills:");
        newHistory.push(...cvData.skills.technical.map(skill => `  • ${skill}`));
        newHistory.push("");
        newHistory.push("Soft Skills:");
        newHistory.push(...cvData.skills.soft.map(skill => `  • ${skill}`));
        newHistory.push("");
        break;
      case "ls education":
        newHistory.push("Education:");
        newHistory.push(...cvData.education.map(e => `  • ${e.level} at ${e.institution}${e.major ? `, Major: ${e.major}` : ''}${e.cgpa ? `, CGPA: ${e.cgpa}` : ''}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.year ? `, Year: ${e.year}` : ''}`));
        newHistory.push("");
        break;
      case "ls experience":
        newHistory.push("Experience:");
        newHistory.push(...cvData.experience.map(e => `  • ${e.title}${e.details ? `: ${e.details.join('; ')}` : ''}`));
        newHistory.push("");
        break;
      case "ls certifications":
        newHistory.push("Certifications:");
        newHistory.push(...cvData.certifications.map(cert => `  • ${cert}`));
        newHistory.push("");
        break;
      case "ls languages":
        newHistory.push("Languages:");
        newHistory.push(...cvData.languages.map(l => `  • ${l.name} (${l.level})`));
        newHistory.push("");
        break;
      case "ls about":
        newHistory.push("About Me:");
        newHistory.push("SHOW_IMAGE");
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
        newHistory.push("bin  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  tmp  usr  var");
        break;
      case "pwd":
        newHistory.push("/home/pankaj");
        break;
      case "whoami":
        newHistory.push("pankaj");
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
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
    <div className="rounded-xl overflow-hidden border-2 border-terminal bg-[#f3f3f3] shadow-lg flex flex-col min-h-[200px] sm:min-h-[240px] md:min-h-[260px] font-mono terminal-zoom">
      {/* Linux title bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#e5e5e5] border-b border-terminal">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#e95420] inline-block"></span>
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#fbbc05] inline-block"></span>
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#34a853] inline-block"></span>
        <span className="ml-3 sm:ml-4 text-xs sm:text-sm font-bold text-black tracking-widest">Linux Terminal</span>
      </div>
      <div className="flex-1 p-3 sm:p-4 text-black text-sm sm:text-base flex flex-col justify-end overflow-y-auto">
        {history.map((line, idx) =>
          line === "SHOW_IMAGE"
            ? <Image key={idx} src="/about-me.jpeg" alt="Pankaj Bhatta" width={140} height={140} style={{ objectFit: 'cover', borderRadius: '100%', margin: '16px auto', display: 'block', border: '3px solid #888' }} />
            : <div key={idx}>{line}</div>
        )}
        <div className="flex items-center">
          <span className="text-accent-green text-sm sm:text-base">pankaj@linux:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="ml-2 bg-transparent border-none outline-none text-black flex-1 font-mono text-sm sm:text-base"
            spellCheck="false"
            autoComplete="off"
          />
          <button
            type="button"
            className="ml-0 p-2 rounded bg-accent-green text-black block sm:hidden flex items-center justify-center"
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