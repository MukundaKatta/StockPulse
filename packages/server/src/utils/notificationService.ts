export type NotificationChannel = 'email' | 'push' | 'sms' | 'webhook' | 'in_app';

export interface Notification {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
  sentAt: string;
  status: 'sent' | 'failed' | 'queued';
}

export interface ChannelConfig {
  name: NotificationChannel;
  enabled: boolean;
  rateLimit: number;
  retryAttempts: number;
  endpoint?: string;
}

const sentNotifications: Notification[] = [];
let notificationIdCounter = 0;

const channels = new Map<NotificationChannel, ChannelConfig>([
  ['email', { name: 'email', enabled: true, rateLimit: 100, retryAttempts: 3 }],
  ['push', { name: 'push', enabled: true, rateLimit: 500, retryAttempts: 2 }],
  ['sms', { name: 'sms', enabled: true, rateLimit: 50, retryAttempts: 2 }],
  ['webhook', { name: 'webhook', enabled: false, rateLimit: 200, retryAttempts: 3 }],
  ['in_app', { name: 'in_app', enabled: true, rateLimit: 1000, retryAttempts: 1 }],
]);

export function send(
  channel: NotificationChannel,
  recipient: string,
  subject: string,
  body: string,
  metadata?: Record<string, unknown>
): Notification {
  const channelConfig = channels.get(channel);

  if (!channelConfig || !channelConfig.enabled) {
    const notification: Notification = {
      id: `notif-${++notificationIdCounter}`,
      channel,
      recipient,
      subject,
      body,
      metadata,
      sentAt: new Date().toISOString(),
      status: 'failed',
    };
    sentNotifications.push(notification);
    return notification;
  }

  const notification: Notification = {
    id: `notif-${++notificationIdCounter}`,
    channel,
    recipient,
    subject,
    body,
    metadata,
    sentAt: new Date().toISOString(),
    status: 'sent',
  };

  sentNotifications.push(notification);
  return notification;
}

export function sendBatch(
  channel: NotificationChannel,
  recipients: string[],
  subject: string,
  body: string,
  metadata?: Record<string, unknown>
): Notification[] {
  return recipients.map((recipient) => send(channel, recipient, subject, body, metadata));
}

export function createChannel(config: ChannelConfig): ChannelConfig {
  channels.set(config.name, config);
  return config;
}

export function getChannel(name: NotificationChannel): ChannelConfig | undefined {
  return channels.get(name);
}

export function listChannels(): ChannelConfig[] {
  return Array.from(channels.values());
}

export function getNotificationHistory(limit = 50): Notification[] {
  return sentNotifications.slice(-limit);
}

export function getNotificationById(id: string): Notification | undefined {
  return sentNotifications.find((n) => n.id === id);
}
