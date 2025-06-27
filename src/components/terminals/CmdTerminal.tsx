"use client";
import React, { useState, useRef, useEffect } from "react";
import cvData from '../../data/cvData';

export default function CmdTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows [Version 10.0.19045.3693]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "Type &apos;help&apos; for available commands",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `C:\\Users\\Pankaj> ${cmd}`];
    switch (cmd.toLowerCase()) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help");
        newHistory.push("  cd projects");
        newHistory.push("  cd skills");
        newHistory.push("  cd education");
        newHistory.push("  cd experience");
        newHistory.push("  cd certifications");
        newHistory.push("  cd languages");
        newHistory.push("  cd about");
        break;
      case "cd projects":
        newHistory.push("Projects:");
        newHistory.push(...[
          "  • Anywhere AI (https://anywhere-ai.vercel.app/landing)",
          "  • Portfolio Website, Website on Github",
          "  • School Website (www.laa.edu.np)",
          ""
        ]);
        break;
      case "cd skills":
        newHistory.push("Technical Skills:");
        newHistory.push(...cvData.skills.technical.map(skill => `  • ${skill}`));
        newHistory.push("");
        newHistory.push("Soft Skills:");
        newHistory.push(...cvData.skills.soft.map(skill => `  • ${skill}`));
        newHistory.push("");
        break;
      case "cd education":
        newHistory.push("Education:");
        newHistory.push(...cvData.education.map(e => `  • ${e.level} at ${e.institution}${e.major ? `, Major: ${e.major}` : ''}${e.cgpa ? `, CGPA: ${e.cgpa}` : ''}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.year ? `, Year: ${e.year}` : ''}`));
        newHistory.push("");
        break;
      case "cd experience":
        newHistory.push("Experience:");
        newHistory.push(...cvData.experience.map(e => `  • ${e.title}${e.details ? `: ${e.details.join('; ')}` : ''}`));
        newHistory.push("");
        break;
      case "cd certifications":
        newHistory.push("Certifications:");
        newHistory.push(...cvData.certifications.map(cert => `  • ${cert}`));
        newHistory.push("");
        break;
      case "cd languages":
        newHistory.push("Languages:");
        newHistory.push(...cvData.languages.map(l => `  • ${l.name} (${l.level})`));
        newHistory.push("");
        break;
      case "cd about":
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
      case "cls":
        setHistory([]);
        return;
      case "dir":
        newHistory.push(" Directory of C:\\Users\\Pankaj");
        newHistory.push("");
        newHistory.push("    <DIR>          Documents");
        newHistory.push("    <DIR>          Downloads");
        newHistory.push("    <DIR>          Pictures");
        newHistory.push("    <DIR>          Music");
        newHistory.push("    <DIR>          Videos");
        break;
      case "cd":
        newHistory.push("C:\\Users\\Pankaj");
        break;
      case "echo hello":
        newHistory.push("hello");
        break;
      default:
        newHistory.push(`'${cmd}' is not recognized as an internal or external command,`);
        newHistory.push("operable program or batch file.");
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
    <div className="rounded-xl overflow-hidden border-2 border-terminal bg-[#1a1a1a] shadow-lg flex flex-col min-h-[260px] font-mono terminal-zoom" 
         style={{ fontFamily: 'Consolas, JetBrains Mono, SFMono-Regular, Menlo, Monaco, monospace' }}>
      {/* CMD title bar */}
      <div className="flex items-center px-4 py-2 bg-[#22223b] border-b border-terminal">
        <span className="text-accent-yellow font-mono font-bold tracking-widest">C:\\Windows\\System32\\cmd.exe</span>
      </div>
      <div className="flex-1 p-4 text-accent-yellow text-base flex flex-col justify-end overflow-y-auto cmd-terminal-content">
        {history.map((line, idx) =>
          line === "SHOW_IMAGE"
            ? <img key={idx} src="/about-me.jpeg" alt="Pankaj Bhatta" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '100%', margin: '16px auto', display: 'block', border: '3px solid #888' }} />
            : <div key={idx}>{line}</div>
        )}
        <div className="flex items-center">
          <span className="text-accent-yellow">C:\Users\Pankaj&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="ml-2 bg-transparent border-none outline-none text-accent-yellow flex-1 font-mono"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
} 