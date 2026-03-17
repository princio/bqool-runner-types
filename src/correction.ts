// ── AI output types ───────────────────────────────────────────────────────────

export interface AiBooleanQResult {
  id: number;
  answer: boolean;
  citations: string[];
  rationale: string;
}

export interface AiItemCorrectionOutput {
  'booleanq-questions': AiBooleanQResult[];
}

export interface AiCoherenceOutput {
  level: number;
  rationale: string;
}

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
