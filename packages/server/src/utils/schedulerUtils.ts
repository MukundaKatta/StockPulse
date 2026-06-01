export interface ScheduledTask {
  id: string;
  name: string;
  cronExpression: string | null;
  runAt: Date | null;
  callback: () => void | Promise<void>;
  status: 'scheduled' | 'running' | 'completed' | 'cancelled' | 'failed';
  lastRun: Date | null;
  nextRun: Date | null;
  createdAt: Date;
}

export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const scheduledTasks = new Map<string, ScheduledTask>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();
let taskIdCounter = 0;

export function schedule(
  name: string,
  cronExpression: string,
  callback: () => void | Promise<void>
): ScheduledTask {
  const id = `task-${++taskIdCounter}`;
  const nextRun = getNextCronRun(cronExpression);

  const task: ScheduledTask = {
    id,
    name,
    cronExpression,
    runAt: null,
    callback,
    status: 'scheduled',
    lastRun: null,
    nextRun,
    createdAt: new Date(),
  };

  scheduledTasks.set(id, task);

  if (nextRun) {
    const delay = nextRun.getTime() - Date.now();
    if (delay > 0) {
      const timer = setTimeout(async () => {
        task.status = 'running';
        task.lastRun = new Date();
        try {
          await task.callback();
          task.status = 'completed';
        } catch {
          task.status = 'failed';
        }
      }, delay);
      timers.set(id, timer);
    }
  }

  return task;
}

export function runAt(
  name: string,
  date: Date,
  callback: () => void | Promise<void>
): ScheduledTask {
  const id = `task-${++taskIdCounter}`;

  const task: ScheduledTask = {
    id,
    name,
    cronExpression: null,
    runAt: date,
    callback,
    status: 'scheduled',
    lastRun: null,
    nextRun: date,
    createdAt: new Date(),
  };

  scheduledTasks.set(id, task);

  const delay = date.getTime() - Date.now();
  if (delay > 0) {
    const timer = setTimeout(async () => {
      task.status = 'running';
      task.lastRun = new Date();
      try {
        await task.callback();
        task.status = 'completed';
      } catch {
        task.status = 'failed';
      }
    }, delay);
    timers.set(id, timer);
  }

  return task;
}

export function cancelSchedule(taskId: string): boolean {
  const task = scheduledTasks.get(taskId);
  if (!task) return false;

  const timer = timers.get(taskId);
  if (timer) {
    clearTimeout(timer);
    timers.delete(taskId);
  }

  task.status = 'cancelled';
  return true;
}

export function getTask(taskId: string): ScheduledTask | undefined {
  return scheduledTasks.get(taskId);
}

export function listTasks(): ScheduledTask[] {
  return Array.from(scheduledTasks.values()).map((task) => ({
    ...task,
    callback: task.callback, // keep reference
  }));
}

export function cronParse(expression: string): CronParts {
  const parts = expression.trim().split(/\s+/);

  if (parts.length !== 5) {
    throw new Error(
      `Invalid cron expression '${expression}': expected 5 parts (minute hour dayOfMonth month dayOfWeek)`
    );
  }

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

function getNextCronRun(expression: string): Date | null {
  try {
    const parts = cronParse(expression);
    const now = new Date();
    const next = new Date(now);

    // Simplified: advance to the next matching minute/hour
    const targetMinute = parts.minute === '*' ? now.getMinutes() : parseInt(parts.minute, 10);
    const targetHour = parts.hour === '*' ? now.getHours() : parseInt(parts.hour, 10);

    next.setSeconds(0, 0);
    next.setMinutes(targetMinute);
    next.setHours(targetHour);

    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }

    return next;
  } catch {
    return null;
  }
}

export function describeCron(expression: string): string {
  const parts = cronParse(expression);
  const descriptions: string[] = [];

  if (parts.minute === '0' && parts.hour === '*') {
    descriptions.push('Every hour at the top of the hour');
  } else if (parts.minute === '*' && parts.hour === '*') {
    descriptions.push('Every minute');
  } else {
    descriptions.push(`At minute ${parts.minute} of hour ${parts.hour}`);
  }

  if (parts.dayOfMonth !== '*') {
    descriptions.push(`on day ${parts.dayOfMonth} of the month`);
  }

  if (parts.month !== '*') {
    descriptions.push(`in month ${parts.month}`);
  }

  if (parts.dayOfWeek !== '*') {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNum = parseInt(parts.dayOfWeek, 10);
    descriptions.push(`on ${dayNames[dayNum] || parts.dayOfWeek}`);
  }

  return descriptions.join(' ');
}
