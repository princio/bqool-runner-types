// ── Rubric-Draft: DB-backed batch seek ───────────────────────────────────────

export interface RubricDraftAnswer {
  student_id: number;
  student_name: string;
  answer_text: string;
}

export interface RubricDraftStartRequest {
  question_id: number;
  question_text: string;
  item_type: string;
  model?: string;
  answers: RubricDraftAnswer[];
}

export interface RubricDraftStartResponse {
  id: number;
}

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
