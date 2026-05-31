'use client';

import { useState, useEffect } from 'react';
import { getSocket } from '@/lib/socket';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected';

export function useConnectionStatus(): ConnectionState {
  const [status, setStatus] = useState<ConnectionState>('connecting');

  useEffect(() => {
    const socket = getSocket();

    function onConnect() { setStatus('connected'); }
    function onDisconnect() { setStatus('disconnected'); }
    function onReconnectAttempt() { setStatus('connecting'); }

    if (socket.connected) setStatus('connected');

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('reconnect_attempt', onReconnectAttempt);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('reconnect_attempt', onReconnectAttempt);
    };
  }, []);

  return status;
}
