"use client";
import React, { useState, useRef, useEffect } from "react";
import cvData from '../../data/cvData';

export default function PowerShellTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Windows PowerShell",
    "Copyright (C) Microsoft Corporation. All rights reserved.",
    "",
    "Type help for available commands",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `PS C:\\Users\\Pankaj> ${cmd}`];
    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help");
        newHistory.push("  Get-Projects");
        newHistory.push("  Get-Skills");
        newHistory.push("  Get-Education");
        newHistory.push("  Get-Experience");
        newHistory.push("  Get-Certifications");
        newHistory.push("  Get-Languages");
        newHistory.push("  Get-About");
        break;
      case "get-projects":
        newHistory.push("Projects:");
        newHistory.push(...[
          "  • Anywhere AI (https://anywhere-ai.vercel.app/landing)",
          "  • Portfolio Website, Website on Github",
          "  • School Website (www.laa.edu.np)",
          ""
        ]);
        break;
      case "get-skills":
        newHistory.push("Technical Skills:");
        newHistory.push(...cvData.skills.technical.map(skill => `  • ${skill}`));
        newHistory.push("");
        newHistory.push("Soft Skills:");
        newHistory.push(...cvData.skills.soft.map(skill => `  • ${skill}`));
        newHistory.push("");
        break;
      case "get-education":
        newHistory.push("Education:");
        newHistory.push(...cvData.education.map(e => `  • ${e.level} at ${e.institution}${e.major ? `, Major: ${e.major}` : ''}${e.cgpa ? `, CGPA: ${e.cgpa}` : ''}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.year ? `, Year: ${e.year}` : ''}`));
        newHistory.push("");
        break;
      case "get-experience":
        newHistory.push("Experience:");
        newHistory.push(...cvData.experience.map(e => `  • ${e.title}${e.details ? `: ${e.details.join('; ')}` : ''}`));
        newHistory.push("");
        break;
      case "get-certifications":
        newHistory.push("Certifications:");
        newHistory.push(...cvData.certifications.map(cert => `  • ${cert}`));
        newHistory.push("");
        break;
      case "get-languages":
        newHistory.push("Languages:");
        newHistory.push(...cvData.languages.map(l => `  • ${l.name} (${l.level})`));
        newHistory.push("");
        break;
      case "get-about":
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
        newHistory.push("    Directory: C:\\Users\\Pankaj");
        newHistory.push("");
        newHistory.push("Mode                 LastWriteTime         Length Name");
        newHistory.push("----                 -------------         ------ ----");
        newHistory.push("d-----         1/1/2024   1:00 PM                Documents");
        newHistory.push("d-----         1/1/2024   1:00 PM                Downloads");
        newHistory.push("d-----         1/1/2024   1:00 PM                Pictures");
        newHistory.push("d-----         1/1/2024   1:00 PM                Music");
        newHistory.push("d-----         1/1/2024   1:00 PM                Videos");
        break;
      case "pwd":
        newHistory.push("Path");
        newHistory.push("----");
        newHistory.push("C:\\Users\\Pankaj");
        break;
      case "echo hello":
        newHistory.push("hello");
        break;
      default:
        newHistory.push(`The term '${cmd}' is not recognized as the name of a cmdlet,`);
        newHistory.push("function, script file, or operable program.");
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
    <div className="rounded-xl overflow-hidden border-2 border-terminal bg-[#0c1a25] shadow-lg flex flex-col min-h-[260px] font-mono terminal-zoom" 
         style={{ fontFamily: 'Cascadia Mono, JetBrains Mono, SFMono-Regular, Menlo, Monaco, monospace' }}>
      {/* PowerShell title bar */}
      <div className="flex items-center px-4 py-2 bg-[#012456] border-b border-terminal">
        <span className="text-accent-blue font-mono font-bold tracking-widest">Windows PowerShell</span>
      </div>
      <div className="flex-1 p-4 text-accent-blue text-base flex flex-col justify-end overflow-y-auto powershell-terminal-content">
        {history.map((line, idx) => <div key={idx}>{line}</div>)}
        <div className="flex items-end">
          <span className="text-accent-blue font-mono text-sm sm:text-base leading-normal">PS C:\Users\Pankaj&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="ml-2 bg-transparent border-none outline-none text-accent-blue flex-1 font-mono text-sm sm:text-base leading-normal p-0 m-0 relative top-[2px]"
            spellCheck="false"
            autoComplete="off"
          />
          <button
            type="button"
            className="ml-0 p-2 rounded bg-accent-blue text-white block sm:hidden flex items-center justify-center"
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