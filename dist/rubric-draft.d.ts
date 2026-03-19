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
//# sourceMappingURL=rubric-draft.d.ts.map