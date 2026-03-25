import type { CriterionType } from "@princio/bqool";
export interface AnswerBooleanqRequest {
    answer_id: number;
    question_id: number;
    student_name: string;
    answer_text: string;
    criterion_type: CriterionType;
    criterion: {
        id: number;
        name: string;
        definition: string;
        severity?: number;
    };
    booleanq: {
        id: number;
        text: string;
    };
    model?: string;
}
export interface AnswerCriterionRequest {
    answer_id: number;
    question_id: number;
    student_name: string;
    answer_text: string;
    item_type: string;
    criterion: {
        id: number;
        name: string;
        definition?: string;
        severity?: number;
    };
    booleanqs: {
        id: number;
        text: string;
    }[];
    model?: string;
}
export interface AnswerCoherenceRequest {
    answer_id: number;
    question_id: number;
    student_name: string;
    answer_text: string;
    model?: string;
}
export interface AnswerSeedRequest {
    answer_id: number;
    question_id: number;
    student_name: string;
    answer_text: string;
    item_type: string;
    model?: string;
}
export interface AnswerSeedResponse {
    session_id: string;
    workdir_label: string;
}
export interface AnswerForkRequest {
    answer_id: number;
    question_id: number;
    student_name: string;
    item_type: string;
    criterion: {
        id: number;
        name: string;
        definition?: string;
        severity?: number;
    };
    booleanqs: {
        id: number;
        text: string;
    }[];
    parent_session_id: string;
    parent_workdir_label: string;
    model?: string;
}
export interface BooleanQOutput {
    id: number;
    answer: boolean;
    citations: string[];
    rationale: string;
}
export interface CriterionOutput {
    'booleanq-questions': BooleanQOutput[];
}
export interface CoherenceOutput {
    level: number;
    rationale: string;
}
export interface AnswerManyCriterion {
    id: number;
    name: string;
    definition?: string;
    severity?: number;
}
export interface AnswerManyEntry {
    answer_id: number;
    student_name: string;
    answer_text: string;
    criteria: Array<{
        criterion: AnswerManyCriterion;
        booleanqs: {
            id: number;
            text: string;
        }[];
    }>;
}
export interface AnswerManyStartRequest {
    question_id: number;
    item_type: string;
    concurrency: number;
    model?: string;
    use_seed_fork?: boolean;
    answers: AnswerManyEntry[];
}
export interface AnswerManyStartResponse {
    batch_id: string;
}
export type AnswerManyJobStatus = 'pending' | 'running' | 'done' | 'error';
export interface AnswerManyJobState {
    answer_id: number;
    student_name: string;
    criterion_id: number;
    criterion_name: string;
    status: AnswerManyJobStatus;
    error?: string;
    started_at?: string;
    finished_at?: string;
    results?: BooleanQOutput[];
}
export type AnswerManyPhase = 'seeding' | 'forking' | 'running' | 'done' | 'stopped';
export interface AnswerManyStatus {
    batch_id: string;
    question_id: number;
    item_type: string;
    phase: AnswerManyPhase;
    concurrency: number;
    total: number;
    completed: number;
    running: number;
    seeds_total?: number;
    seeds_completed?: number;
    log: string[];
    jobs: AnswerManyJobState[];
    results_cursor: number;
}
//# sourceMappingURL=answer.d.ts.map