export interface RubricSeekBooleanqItem {
  text: string;
}

export interface RubricSeekBaseItem {
  name: string;
  definition: string;
  booleanqs: RubricSeekBooleanqItem[];
}

export interface RubricSeekSeverityItem extends RubricSeekBaseItem {
  severity: number;
}

export interface RubricSeekOutput {
  concepts: RubricSeekBaseItem[];
  expressions: RubricSeekSeverityItem[];
  code: RubricSeekSeverityItem[];
  errors: RubricSeekSeverityItem[];
}

export interface RubricSeekRequest {
  question_id: number;
  student_id: number;
  student_name: string;
  item_type: string;
  question_text: string;
  answer_text: string;
  model?: string;
}

// ── R6: Rubric-seek batch ─────────────────────────────────────────────────────

export interface RubricSeekBatchAnswer {
  student_id: number;
  student_name: string;
  answer_text: string;
}

export interface RubricSeekBatchStartRequest {
  question_id: number;
  item_type: string;
  concurrency: number;
  model?: string;
  answers: RubricSeekBatchAnswer[];
}

export interface RubricSeekBatchStartResponse {
  batch_id: string;
}

export type RubricSeekBatchJobStatus = 'pending' | 'running' | 'done' | 'error';

export interface RubricSeekBatchJobState {
  student_id: number;
  student_name: string;
  status: RubricSeekBatchJobStatus;
  error?: string;
  exit_code?: number | null;
  started_at?: string;
  finished_at?: string;
}

export type RubricSeekBatchPhase = 'correcting' | 'done' | 'stopped';

export interface RubricSeekBatchStatus {
  batch_id: string;
  question_id: number;
  item_type: string;
  phase: RubricSeekBatchPhase;
  concurrency: number;
  total: number;
  completed: number;
  running: number;
  log: string[];
  jobs: RubricSeekBatchJobState[];
}
