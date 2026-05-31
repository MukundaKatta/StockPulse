'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/formatters';
import { User, Shield, Smartphone, Clock, LogOut } from 'lucide-react';

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SESSIONS: Session[] = [
  { id: '1', device: 'Chrome on macOS', location: 'San Francisco, CA', lastActive: 'Now', current: true },
  { id: '2', device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: '2 hours ago', current: false },
  { id: '3', device: 'Firefox on Windows', location: 'New York, NY', lastActive: '3 days ago', current: false },
];

export default function AccountPage() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Account</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account security and sessions</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-400" />
            Profile
          </CardTitle>
        </CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <span className="text-xl font-bold text-indigo-400">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
            <p className="text-[10px] text-gray-600">Member since Jan 2024</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="First Name" value="John" onChange={() => {}} />
          <Input label="Last Name" value="Doe" onChange={() => {}} />
        </div>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            Security
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={twoFactor ? 'success' : 'info'}>{twoFactor ? 'Enabled' : 'Disabled'}</Badge>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={cn('w-10 h-5 rounded-full transition-colors relative', twoFactor ? 'bg-green-500' : 'bg-white/10')}
              >
                <div className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all', twoFactor ? 'left-5.5' : 'left-0.5')} />
              </button>
            </div>
          </div>
          <div className="pt-3 border-t border-white/[0.06]">
            <Button variant="secondary" size="sm">Change Password</Button>
          </div>
        </div>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {SESSIONS.map((session) => (
            <div key={session.id} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white">{session.device}</p>
                  {session.current && <Badge variant="success">Current</Badge>}
                </div>
                <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="text-gray-500 hover:text-red-400 p-1">
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button variant="danger" size="sm" className="mt-3">
          <LogOut className="h-3.5 w-3.5 mr-1.5" /> Revoke All Other Sessions
        </Button>
      </Card>
    </motion.div>
  );
}
