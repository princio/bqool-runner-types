// ── Request / response types ──────────────────────────────────────────────────

export interface CorrectionBooleanqRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanq: { id: number; text: string };
  model?: string;
}

export interface CorrectionItemRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanqs: { id: number; text: string }[];
  model?: string;
}

export interface CorrectionCoherenceRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  model?: string;
}

export interface CorrectionSeedRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  model?: string;
}

export interface CorrectionSeedResponse {
  session_id: string;
  workdir_label: string;
}

export interface CorrectionForkRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanqs: { id: number; text: string }[];
  parent_session_id: string;
  parent_workdir_label: string;
  model?: string;
}

export interface BooleanQOutput {
  id: number;
  answer: boolean;
  citations: string[];
  rationale: string;
}

export interface ItemCorrectionOutput {
  'booleanq-questions': BooleanQOutput[];
}

export interface CoherenceOutput {
  level: number;
  rationale: string;
}

// ── R7: Correction batch ──────────────────────────────────────────────────────

export interface CorrectionBatchItem {
  id: number;
  name: string;
  definition?: string;
  severity?: number;
}

export interface CorrectionBatchAnswerEntry {
  answer_id: number;
  student_name: string;
  answer_text: string;
  items: Array<{
    item: CorrectionBatchItem;
    booleanqs: { id: number; text: string }[];
  }>;
}

export interface CorrectionBatchStartRequest {
  question_id: number;
  item_type: string;
  concurrency: number;
  model?: string;
  use_seed_fork?: boolean;
  answers: CorrectionBatchAnswerEntry[];
}

export interface CorrectionBatchStartResponse {
  batch_id: string;
}

export type CorrectionBatchJobStatus = 'pending' | 'running' | 'done' | 'error';

export interface CorrectionBatchJobState {
  answer_id: number;
  student_name: string;
  item_id: number;
  item_name: string;
  status: CorrectionBatchJobStatus;
  error?: string;
  started_at?: string;
  finished_at?: string;
  results?: BooleanQOutput[];
}

export type CorrectionBatchPhase = 'seeding' | 'forking' | 'running' | 'done' | 'stopped';

export interface CorrectionBatchStatus {
  batch_id: string;
  question_id: number;
  item_type: string;
  phase: CorrectionBatchPhase;
  concurrency: number;
  total: number;
  completed: number;
  running: number;
  seeds_total?: number;
  seeds_completed?: number;
  log: string[];
  jobs: CorrectionBatchJobState[];
  /** Cursor so callers can fetch only newly completed results since last poll. */
  results_cursor: number;
}
