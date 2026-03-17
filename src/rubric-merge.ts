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

// ── DB-backed rubric-merge (new API) ─────────────────────────────────────────

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
