export interface WorkdirCriterion {
  id: number;
  name: string;
  definition?: string;
  severity?: number;
  position?: number;
}

export interface WorkdirCriteria {
  concepts: WorkdirCriterion[];
  expressions: WorkdirCriterion[];
  code: WorkdirCriterion[];
  errors: WorkdirCriterion[];
}

export interface AnswerWorkdirRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  question_text: string;
  criteria: WorkdirCriteria;
  booleanqs_by_item: Record<string, { id: number; text: string }[]>;
}

export interface AnswerWorkdirResponse {
  workdir: string;
  ok: boolean;
}

export interface AnswerWorkdirStatusRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
}

export interface AnswerWorkdirStatusResponse {
  workdir: string | null;
  workdir_mtime: string | null;
  output_mtime: string | null;
}

// ── R2: Read answer output JSON ───────────────────────────────────────────────

export interface AnswerOutputReadResponse {
  data: Record<string, unknown>;
}

// ── R3: Write answer output JSON ──────────────────────────────────────────────

export interface AnswerOutputWriteRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  data: Record<string, unknown>;
}

export interface AnswerOutputWriteResponse {
  ok: boolean;
}

export interface PopulationWorkdirRequest {
  question_id: number;
  item_type: string;
  criteria: WorkdirCriteria;
  booleanqs_by_item: Record<string, { id: number; text: string }[]>;
  question_text: string;
}

export interface PopulationWorkdirResponse {
  id: string;
  path: string;
  relativePath: string;
  question_id: number;
}

// ── R5: Read population output JSON ──────────────────────────────────────────

export interface PopulationOutputReadResponse {
  data: Record<string, unknown>;
}

// ── R1: Create population batch workdir ──────────────────────────────────────

export interface PopulationBatchWorkdirRequest {
  question_id: number;
  student_id: number;
  student_name: string;
  item_type: string;
  question_text: string;
  answer_text: string;
  expected_answer?: string;
}

export interface PopulationBatchWorkdirResponse {
  workdir: string;
  student_name: string;
  student_id: number;
}

// ── R4: List population batch workdirs ───────────────────────────────────────

export interface PopulationBatchListEntry {
  student_id: number;
  student_name: string;
  has_output: boolean;
}

export interface PopulationBatchListResponse {
  dirs: PopulationBatchListEntry[];
  counts: { total: number; with_output: number };
}
