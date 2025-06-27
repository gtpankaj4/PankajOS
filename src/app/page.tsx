"use client";
import Navbar from "@/components/Navbar";
import MacTerminal from "@/components/terminals/MacTerminal";
import LinuxTerminal from "@/components/terminals/LinuxTerminal";
import CmdTerminal from "@/components/terminals/CmdTerminal";
import PowerShellTerminal from "@/components/terminals/PowerShellTerminal";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

function AboutMeTerminalSection() {
  const aboutText = `I'm a web designer and graphics editor with expertise in Adobe Photoshop, CSS, HTML, and C. I'm also a proficient video editor using Adobe Premiere Pro, and a quick learner always seeking new challenges to further develop my skills. My attention to detail and commitment quality me to deliver unique and innovative solutions to any project.`;
  type CommandMap = { [key: string]: (string | React.ReactNode)[] };
  const commands: CommandMap = {
    help: [
      "Available commands:",
      "about - Show about me info",
      "photo - Show my photo",
      "clear - Clear the terminal"
    ],
    about: [aboutText],
    photo: [<Image key="photo" src="/hero.jpg" alt="Pankaj Bhatta" width={220} height={260} className="rounded-lg object-cover border-2 border-terminal mx-auto my-4" />],
  };
  const [history, setHistory] = useState([
    "Welcome to PankajOS! Type 'help' to get started."
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    let output: any = [];
    if (cmd === "clear") {
      setHistory([]);
      return;
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
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-0 px-2 mb-4" style={{ marginBottom: '1rem' }}>
      <div className="w-full max-w-2xl rounded-xl border-2 border-terminal bg-[#f3eee7] dark:bg-[#181816] shadow-lg p-0 overflow-hidden terminal-zoom">
        <div className="px-4 py-2 flex items-center border-b border-terminal bg-[#e5e5e5] dark:bg-[#23223a]">
          <span className="font-mono font-bold text-lg text-[#181816] dark:text-[#fff]">PankajOS Terminal</span>
        </div>
        <div className="p-4 min-h-[300px] font-mono text-sm sm:text-base text-[#181816] dark:text-[#f6eedc]">
          {history.map((line, idx) => (
            <div key={idx} className="mb-1">{line}</div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="mr-2 text-green-400">$</span>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent outline-none border-none font-mono text-sm sm:text-base text-[#181816] dark:text-[#f6eedc]"
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col main-bg transition-colors duration-500 overflow-x-hidden overflow-y-auto">
      <Navbar />
      {/* About Me Terminal Section at the top */}
      <AboutMeTerminalSection />
      {/* Responsive terminal grid below */}
      <div className="flex-1 grid grid-cols-1 grid-rows-4 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 max-w-[1400px] mx-auto w-full sm:grid-cols-2 sm:grid-rows-2 z-10">
        <MacTerminal />
        <LinuxTerminal />
        <CmdTerminal />
        <PowerShellTerminal />
      </div>
    </div>
  );
}

// SkillBar component
function SkillBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-[#181816] dark:text-white">{label}</span>
        <span className="text-[#181816] dark:text-white">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-[#e5e5e5] dark:bg-[#333] rounded-full transition-colors duration-500">
        <div
          className="h-2 rounded-full bg-red-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
