export interface RubricSeekRequest {
  question_id: number;
  student_id: number;
  student_name: string;
  item_type: string;
  question_text: string;
  answer_text: string;
  model?: string;
}
