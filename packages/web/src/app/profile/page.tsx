'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/stores/appStore';
import api from '@/lib/api';
import { User, Shield, Calendar, Mail, Save } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, setUser } = useAppStore();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPassword: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.patch('/api/auth/me', { name: name.trim() });
      setUser(data.user);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const errs: Record<string, string> = {};
    if (!passwordForm.current) errs.current = 'Current password required';
    if (!passwordForm.newPassword) errs.newPassword = 'New password required';
    else if (passwordForm.newPassword.length < 8) errs.newPassword = 'Min 8 characters';
    if (passwordForm.newPassword !== passwordForm.confirm) errs.confirm = 'Passwords do not match';
    setPasswordErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await api.post('/api/auth/change-password', {
        currentPassword: passwordForm.current,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed successfully');
      setPasswordForm({ current: '', newPassword: '', confirm: '' });
    } catch (err: any) {
      const msg = err?.response?.data?.error?.message || 'Failed to change password';
      toast.error(msg);
    }
  };

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-600" />
          <h2 className="mt-3 text-lg font-bold text-white">Not signed in</h2>
          <p className="mt-1 text-sm text-gray-500">Please sign in to view your profile</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-indigo-400 hover:text-indigo-300">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <User className="mr-1 inline h-4 w-4" />
            Account Info
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20">
              <span className="text-lg font-bold text-indigo-400">
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-white">{user.name || 'Anonymous'}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </p>
            </div>
            <Badge variant="info" className="ml-auto">Free Plan</Badge>
          </div>

          <Input
            label="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />

          <Button onClick={handleUpdateProfile} disabled={loading}>
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Shield className="mr-1 inline h-4 w-4" />
            Change Password
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm.current}
            onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
            error={passwordErrors.current}
            autoComplete="current-password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
            error={passwordErrors.newPassword}
            autoComplete="new-password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirm}
            onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
            error={passwordErrors.confirm}
            autoComplete="new-password"
          />
          <Button variant="secondary" onClick={handleChangePassword}>
            Update Password
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar className="mr-1 inline h-4 w-4" />
            Account Details
          </CardTitle>
        </CardHeader>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="text-gray-300 font-mono text-xs">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-300">{user.email}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
