// ── Seek: schema types ────────────────────────────────────────────────────────

export interface RubricSeekBooleanq {
  text: string;
}

export interface RubricSeekConcept {
  name: string;
  definition: string;
  booleanqs: RubricSeekBooleanq[];
}

export interface RubricSeekSeverity extends RubricSeekConcept {
  severity: number;
}

export interface RubricSeekOutput {
  concepts: RubricSeekConcept[];
  expressions: RubricSeekSeverity[];
  code: RubricSeekSeverity[];
  errors: RubricSeekSeverity[];
}

// ── Seek: request / response ──────────────────────────────────────────────────

export interface RubricSeekAnswer {
  student_id: number;
  student_name: string;
  answer_text: string;
}

export interface RubricSeekRequest {
  question_id: number;
  question_text: string;
  item_type: string;
  model?: string;
  answers: RubricSeekAnswer[];
}

export interface RubricSeekResponse {
  id: number;
}

// ── Draft: batch status ───────────────────────────────────────────────────────

export type RubricDraftChildStatus = 'pending' | 'running' | 'done' | 'error';

export interface RubricDraftChildState {
  id: number;
  student_id: number | null;
  student_name: string | null;
  status: RubricDraftChildStatus;
  error?: string;
}

export type RubricDraftPhase = 'running' | 'done' | 'partial';

export interface RubricDraftStatus {
  id: number;
  question_id: number | null;
  item_type: string | null;
  phase: RubricDraftPhase;
  total: number;
  completed: number;
  running: number;
  failed: number;
  children: RubricDraftChildState[];
}

// ── Merge: legacy filesystem API ──────────────────────────────────────────────

export interface RubricMergeCreateWorkdirRequest {
  question_id: number;
  item_type: string;
}

export interface RubricMergeWorkdirResponse {
  workdir: string;
  relativePath: string;
}

export interface RubricMergeStatusResponse {
  hasMergeWorkdir: boolean;
  hasOutput: boolean;
  relativePath?: string;
}

export interface RubricMergeImportResponse {
  population_id: string;
}

// ── Merge: DB-backed API ──────────────────────────────────────────────────────

export interface RubricMergeTriggerRequest {
  rubric_draft_id: number;
}

export interface RubricMergeTriggerResponse {
  id: number;
  workdir: string;
  relativePath: string;
}

export interface RubricMergeCompleteResponse {
  ok: boolean;
  output: unknown;
  population_id: string;
}

export interface RubricMergeJobStatusResponse {
  id: number;
  status: 'waiting' | 'done' | 'error';
  workdir: string;
  output: unknown | null;
}
