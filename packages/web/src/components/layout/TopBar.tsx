'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { useMarketStatus } from '@/hooks/useMarketStatus';
import { Search, Bell, User, Command, Sun, Moon, LogOut, Settings, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/formatters';

export function TopBar() {
  const { user, theme, toggleTheme, setCommandPaletteOpen, logout } = useAppStore();
  const marketStatus = useMarketStatus();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0f] px-4 pl-12 md:pl-4">
      {/* Search */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#12121a] px-3 py-1.5 text-sm text-gray-500 transition-all hover:border-indigo-500/30 hover:text-gray-400 max-w-[200px] sm:max-w-none"
        aria-label="Search stocks"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Search stocks...</span>
        <kbd className="ml-2 sm:ml-8 hidden sm:flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Market status */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className={cn(
            'inline-block h-2 w-2 rounded-full',
            marketStatus.phase === 'open' && 'bg-green-500 animate-pulse',
            marketStatus.phase === 'pre-market' && 'bg-amber-500 animate-pulse',
            marketStatus.phase === 'after-hours' && 'bg-blue-500',
            marketStatus.phase === 'closed' && 'bg-gray-600',
          )} aria-hidden="true" />
          <span className={marketStatus.color}>{marketStatus.label}</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <Link
          href="/alerts"
          className="relative rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-gray-300"
          aria-label="Alerts"
        >
          <Bell className="h-4 w-4" />
        </Link>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
            aria-label="User menu"
          >
            {user?.name ? (
              <span className="text-xs font-bold">{user.name[0].toUpperCase()}</span>
            ) : (
              <User className="h-4 w-4" />
            )}
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-white/[0.06] bg-[#12121a] py-1 shadow-xl z-50">
              {user ? (
                <>
                  <div className="px-3 py-2 border-b border-white/[0.06]">
                    <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  >
                    <UserCircle className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-400 hover:bg-white/5"
                  >
                    <UserCircle className="h-4 w-4" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
