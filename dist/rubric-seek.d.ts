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
//# sourceMappingURL=rubric-seek.d.ts.map