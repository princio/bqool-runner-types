export interface WorkdirRubricItem {
  id: number;
  name: string;
  definition?: string;
  severity?: number;
  position?: number;
}

export interface WorkdirRubricItems {
  concepts: WorkdirRubricItem[];
  expressions: WorkdirRubricItem[];
  code: WorkdirRubricItem[];
  errors: WorkdirRubricItem[];
}

export interface AnswerWorkdirRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  question_text: string;
  rubric_items: WorkdirRubricItems;
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
  workdir_mtime: string | null;
  output_mtime: string | null;
}

export interface PopulationWorkdirRequest {
  question_id: number;
  item_type: string;
  rubric_items: WorkdirRubricItems;
  booleanqs_by_item: Record<string, { id: number; text: string }[]>;
  question_text: string;
}

export interface PopulationWorkdirResponse {
  id: string;
  path: string;
  relativePath: string;
  question_id: number;
}
