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
