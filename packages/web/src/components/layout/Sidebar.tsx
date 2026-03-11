'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { cn } from '@/lib/formatters';
import {
  LayoutDashboard,
  LineChart,
  Briefcase,
  Filter,
  Settings,
  ChevronLeft,
  Star,
  Plus,
} from 'lucide-react';
import { useEffect } from 'react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { href: '/screener', icon: Filter, label: 'Screener' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { watchlists, activeWatchlistId, fetchWatchlists, setActiveWatchlist } = useWatchlistStore();

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId);

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.2 }}
      className="flex h-screen flex-col border-r border-white/[0.06] bg-[#0a0a0f]"
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <LineChart className="h-6 w-6 text-indigo-500" />
              <span className="font-display text-lg font-bold text-white">StockPulse</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={toggleSidebar} className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-gray-300">
          <ChevronLeft className={cn('h-4 w-4 transition-transform', !sidebarOpen && 'rotate-180')} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Watchlist */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-white/[0.06] px-3 py-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Star className="mr-1 inline h-3 w-3" />
                Watchlist
              </span>
              <button className="rounded p-0.5 text-gray-500 hover:text-gray-300">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            {activeWatchlist?.items.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                href={`/stock/${item.symbol}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200"
              >
                <span className="font-mono font-medium">{item.symbol}</span>
              </Link>
            ))}
            {(!activeWatchlist || activeWatchlist.items.length === 0) && (
              <p className="px-2 py-3 text-center text-xs text-gray-600">
                No stocks in watchlist
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
