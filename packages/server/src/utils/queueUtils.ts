export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Job<T = unknown> {
  id: string;
  data: T;
  status: JobStatus;
  result?: unknown;
  error?: string;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
}

type JobHandler<T> = (data: T) => Promise<unknown>;

export class JobQueue<T = unknown> {
  private jobs: Map<string, Job<T>> = new Map();
  private queue: string[] = [];
  private processing = false;
  private nextId = 1;
  private handler: JobHandler<T>;
  private concurrency: number;
  private activeCount = 0;

  constructor(handler: JobHandler<T>, concurrency: number = 1) {
    this.handler = handler;
    this.concurrency = concurrency;
  }

  enqueue(data: T): Job<T> {
    const id = `job_${this.nextId++}`;
    const job: Job<T> = {
      id,
      data,
      status: 'pending',
      createdAt: Date.now(),
    };
    this.jobs.set(id, job);
    this.queue.push(id);
    this.processNext();
    return job;
  }

  getJob(id: string): Job<T> | undefined {
    return this.jobs.get(id);
  }

  getAll(): Job<T>[] {
    return Array.from(this.jobs.values());
  }

  getPending(): Job<T>[] {
    return this.getAll().filter((j) => j.status === 'pending');
  }

  getSize(): number {
    return this.queue.length;
  }

  private async processNext(): Promise<void> {
    if (this.activeCount >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const jobId = this.queue.shift();
    if (!jobId) return;

    const job = this.jobs.get(jobId);
    if (!job) return;

    this.activeCount++;
    job.status = 'processing';
    job.startedAt = Date.now();

    try {
      job.result = await this.handler(job.data);
      job.status = 'completed';
    } catch (err) {
      job.status = 'failed';
      job.error = err instanceof Error ? err.message : String(err);
    } finally {
      job.completedAt = Date.now();
      this.activeCount--;
      this.processNext();
    }
  }

  clear(): void {
    this.queue = [];
    this.jobs.clear();
  }
}
