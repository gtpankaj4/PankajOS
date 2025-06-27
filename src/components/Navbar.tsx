"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from 'next/link';

const navLinks = [
  { name: "Go to my official website", href: "https://pankaj-bhatta.com.np" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <nav className="sticky top-4 z-50 w-full flex justify-center px-0">
      <div className="navbar-glass w-full max-w-[98vw] mx-2 flex items-center justify-between px-4 py-3">
        {/* Desktop Navbar */}
        <div className="hidden xl:flex w-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-baseline select-none focus:outline-none px-2 sm:px-4 py-2 whitespace-nowrap"
            style={{ fontFamily: 'Breadline, sans-serif', fontWeight: 'normal', color: theme === 'dark' ? '#fff' : '#23223a', letterSpacing: '0.12em' }}
            aria-label="Go to top"
          >
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(2.2em, 7vw, 3.2em)', color: theme === 'dark' ? '#fff' : '#23223a', textTransform: 'uppercase', lineHeight: 1 }}
            >P</span>
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(1.1em, 3vw, 1.7em)', color: theme === 'dark' ? '#fff' : '#23223a', margin: '0 0.08em', textTransform: 'uppercase', lineHeight: 1 }}
            >ANKA</span>
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(2.2em, 7vw, 3.2em)', color: theme === 'dark' ? '#fff' : '#23223a', textTransform: 'uppercase', lineHeight: 1 }}
            >J</span>
            {/* Bottom-left corner */}
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '1.1em',
                height: '1.1em',
                borderBottom: '0.22em solid #ff2e4d',
                borderLeft: '0.22em solid #ff2e4d',
                bottom: 0,
                left: 0
              }}
            />
            {/* Top-right corner */}
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '1.1em',
                height: '1.1em',
                borderTop: '0.22em solid #ff2e4d',
                borderRight: '0.22em solid #ff2e4d',
                top: 0,
                right: 0
              }}
            />
          </Link>
          {/* Nav links with dividers */}
          <ul className="flex gap-12 items-center text-base font-bold mx-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="navbar-zoom-link hover:text-accent-blue transition-colors px-8 py-2 rounded-lg border border-main inline-flex items-center min-w-0 whitespace-nowrap max-w-fit overflow-x-auto"
                  style={{ 
                    fontFamily: "'Anime Ace 3BB', sans-serif",
                    background: theme === 'dark' ? '#2b3038' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#23223a',
                    border: theme === 'dark' ? '1px solid #fff' : '1px solid #23223a'
                  }}
                >
                  <span className="truncate">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Contact Me button (responsive) */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="ml-2 rounded-lg px-6 py-2 font-bold text-base shadow hover:scale-105 transition-transform inline-block flex items-center gap-2"
            style={{ fontFamily: "'Anime Ace 3BB', sans-serif", background: theme === 'dark' ? '#2b3038' : '#fff', color: theme === 'dark' ? '#fff' : '#23223a', border: theme === 'dark' ? '1px solid #fff' : '1px solid #23223a' }}
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
        {/* Mobile Navbar */}
        <div className="flex xl:hidden w-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-baseline select-none focus:outline-none px-2 sm:px-4 py-2 whitespace-nowrap"
            style={{ fontFamily: 'Breadline, sans-serif', fontWeight: 'normal', color: theme === 'dark' ? '#fff' : '#23223a', letterSpacing: '0.12em' }}
            aria-label="Go to top"
          >
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(2.2em, 7vw, 3.2em)', color: theme === 'dark' ? '#fff' : '#23223a', textTransform: 'uppercase', lineHeight: 1 }}
            >P</span>
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(1.1em, 3vw, 1.7em)', color: theme === 'dark' ? '#fff' : '#23223a', margin: '0 0.08em', textTransform: 'uppercase', lineHeight: 1 }}
            >ANKA</span>
            <span
              className="font-normal"
              style={{ fontFamily: 'Breadline, sans-serif', fontSize: 'clamp(2.2em, 7vw, 3.2em)', color: theme === 'dark' ? '#fff' : '#23223a', textTransform: 'uppercase', lineHeight: 1 }}
            >J</span>
            {/* Bottom-left corner */}
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '1.1em',
                height: '1.1em',
                borderBottom: '0.22em solid #ff2e4d',
                borderLeft: '0.22em solid #ff2e4d',
                bottom: 0,
                left: 0
              }}
            />
            {/* Top-right corner */}
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '1.1em',
                height: '1.1em',
                borderTop: '0.22em solid #ff2e4d',
                borderRight: '0.22em solid #ff2e4d',
                top: 0,
                right: 0
              }}
            />
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="rounded-lg px-4 py-1 font-bold text-sm shadow hover:scale-105 transition-transform flex items-center gap-2"
              style={{ fontFamily: "'Anime Ace 3BB', sans-serif", background: theme === 'dark' ? '#2b3038' : '#fff', color: theme === 'dark' ? '#fff' : '#23223a', border: theme === 'dark' ? '1px solid #fff' : '1px solid #23223a' }}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            {/* Hamburger for mobile */}
            <button className="ml-1 z-50 relative h-9 w-9 flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Open menu">
              {open ? (
                <span className="text-[2.2rem] font-extrabold leading-none flex items-center justify-center" style={{lineHeight: '1', fontFamily: 'inherit'}}>&times;</span>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="24" height="3" rx="1.5" fill={theme === 'dark' ? '#fff' : '#181c1f'} />
                  <rect y="10.5" width="24" height="3" rx="1.5" fill={theme === 'dark' ? '#fff' : '#181c1f'} />
                  <rect y="17" width="24" height="3" rx="1.5" fill={theme === 'dark' ? '#fff' : '#181c1f'} />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {open && (
          <ul className="absolute top-full left-0 w-full navbar-glass border-t border-main flex flex-col gap-4 p-4 xl:hidden z-30 shadow-xl animate-logo-pop rounded-b-2xl">
            {navLinks.map((link) => (
              <li key={link.name} className="flex items-center m-0 p-0">
                <Link
                  href={link.href}
                  className="navbar-zoom-link block w-full py-2 px-4 text-base font-bold hover:text-accent-blue transition-colors leading-none rounded-lg border border-main inline-flex items-center justify-between min-w-0 whitespace-nowrap max-w-fit overflow-x-auto"
                  style={{ 
                    fontFamily: "'Anime Ace 3BB', sans-serif", 
                    lineHeight: 1,
                    background: theme === 'dark' ? '#2b3038' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#23223a',
                    border: theme === 'dark' ? '1px solid #fff' : '1px solid #23223a'
                  }}
                  onClick={() => setOpen(false)}
                >
                  <span className="truncate">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
} 