'use client';

import { useAppStore } from '@/stores/appStore';
import { Search, Bell, User, Command, Sun, Moon } from 'lucide-react';

export function TopBar() {
  const { user, theme, toggleTheme, setCommandPaletteOpen, logout } = useAppStore();

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
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <span>Market Open</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          className="relative rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-gray-300"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
            <User className="h-4 w-4" />
          </div>
          {user && (
            <button onClick={logout} className="text-xs text-gray-500 hover:text-gray-300">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
