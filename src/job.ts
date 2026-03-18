export interface RunnerJobRequest {
  /** Relative path under TMP_DIR, e.g. `question-5/seed/42_concept` */
  workdir_label: string;
  /** Files to write in the workdir (filename → content) */
  files?: Record<string, string>;
  /** Disable Claude auto-memory for this job */
  auto_memory_disabled?: boolean;
  /** User prompt for Claude */
  prompt: string;
  model?: string;
  system_prompt?: string;
  append_system_prompt?: string;
  json_schema?: object;
  output_format?: 'text' | 'json' | 'stream-json';
  session_id?: string;
  resume?: string;
  fork_session?: boolean;
  setting_sources?: string;
  no_session_persistence?: boolean;
  /** Opaque metadata stored by runner, queryable via tag.key=value */
  tags?: Record<string, string | number | null>;
  /** Parent job ID (for child jobs in a batch) */
  parent_id?: number;
  /** Job type classifier */
  job_type?: string;
}

export interface RunnerJobResponse {
  id: number;
  status: 'running';
  workdir: string;
}

// ── Job (abstract unit of work) ───────────────────────────────────────────────

export interface Job {
  id: number;
  status: 'pending' | 'running' | 'done' | 'error' | 'waiting';
  output_json: string | null;
  tags: Record<string, string | number | null> | null;
  parent_id: number | null;
  job_type: string | null;
  workdir: string | null;
  created_at: string;
  finished_at: string | null;
  /** Null for meta jobs (no process) or in list responses */
  process: JobProcess | null;
}

// ── JobProcess (Claude subprocess) ────────────────────────────────────────────

export interface JobProcess {
  id: number;
  job_id: number;
  prompt: string;
  system_prompt: string | null;
  model: string | null;
  pid: number | null;
  claude_session_id: string | null;
  exit_code: number | null;
  started_at: string | null;
  finished_at: string | null;
  /** Only included in GET /api/jobs/:id, null in list responses */
  stdout: string | null;
  /** Only included in GET /api/jobs/:id, null in list responses */
  stderr: string | null;
  error_message: string | null;
}

export interface JobListQuery {
  status?: string;
  limit?: number;
  [key: `tag.${string}`]: string;
}

export interface RunnerQueueStatus {
  concurrency: number;
  running: number;
  queued: number;
}
