import type { Job, JobListQuery, RunnerJobRequest, RunnerJobResponse, RunnerQueueStatus } from './job';
import type { AnswerBooleanqRequest, AnswerCriterionRequest, AnswerCoherenceRequest, AnswerSeedRequest, AnswerSeedResponse, AnswerForkRequest, AnswerManyStartRequest, AnswerManyStartResponse, AnswerManyStatus, BooleanQOutput, CriterionOutput, CoherenceOutput } from './answer';
import type { RubricSeekRequest, RubricSeekResponse } from './rubric-seek';
import type { RubricDraftStatus, RubricDraftChildState } from './rubric-draft';
import type { RubricMergeCreateWorkdirRequest, RubricMergeWorkdirResponse, RubricMergeStatusResponse, RubricMergeImportResponse, RubricMergeTriggerRequest, RubricMergeTriggerResponse, RubricMergeCompleteResponse, RubricMergeJobStatusResponse } from './rubric-merge';
import type { AnswerWorkdirRequest, AnswerWorkdirResponse, AnswerWorkdirStatusRequest, AnswerWorkdirStatusResponse, AnswerOutputReadResponse, AnswerOutputWriteRequest, AnswerOutputWriteResponse, PopulationWorkdirRequest, PopulationWorkdirResponse, PopulationOutputReadResponse, PopulationBatchWorkdirRequest, PopulationBatchWorkdirResponse, PopulationBatchListResponse } from './workdir';
/**
 * Maps each route key to its HTTP method, body, params, query, and response types.
 *
 * Provides a single source of truth tying RUNNER_API routes to their HTTP contract.
 */
export interface RunnerApiTypeMap {
    jobs: {
        list: {
            method: 'GET';
            query: JobListQuery;
            body: never;
            response: Job[];
        };
        create: {
            method: 'POST';
            body: RunnerJobRequest;
            response: RunnerJobResponse;
        };
        one: {
            method: 'GET';
            params: {
                id: number;
            };
            body: never;
            response: Job;
        };
        stop: {
            method: 'POST';
            params: {
                id: number;
            };
            body: never;
            response: void;
        };
    };
    queue: {
        status: {
            method: 'GET';
            body: never;
            response: RunnerQueueStatus;
        };
        concurrencyGet: {
            method: 'GET';
            body: never;
            response: {
                concurrency: number;
            };
        };
        concurrencySet: {
            method: 'PUT';
            body: {
                concurrency: number;
            };
            response: {
                concurrency: number;
            };
        };
        stopAll: {
            method: 'POST';
            body: never;
            response: void;
        };
    };
    answer: {
        booleanq: {
            method: 'POST';
            body: AnswerBooleanqRequest;
            response: BooleanQOutput;
        };
        criterion: {
            method: 'POST';
            body: AnswerCriterionRequest;
            response: CriterionOutput;
        };
        coherence: {
            method: 'POST';
            body: AnswerCoherenceRequest;
            response: CoherenceOutput;
        };
        seed: {
            method: 'POST';
            body: AnswerSeedRequest;
            response: AnswerSeedResponse;
        };
        fork: {
            method: 'POST';
            body: AnswerForkRequest;
            response: CriterionOutput;
        };
        manyStart: {
            method: 'POST';
            body: AnswerManyStartRequest;
            response: AnswerManyStartResponse;
        };
        manyStatus: {
            method: 'GET';
            params: {
                id: string;
            };
            body: never;
            response: AnswerManyStatus;
        };
        manyStop: {
            method: 'POST';
            params: {
                id: string;
            };
            body: never;
            response: void;
        };
    };
    rubricDraft: {
        run: {
            method: 'POST';
            body: RubricSeekRequest;
            response: RubricSeekResponse;
        };
        status: {
            method: 'GET';
            params: {
                id: number;
            };
            body: never;
            response: RubricDraftStatus;
        };
        answerStatus: {
            method: 'GET';
            params: {
                id: number;
                answerId: number;
            };
            body: never;
            response: RubricDraftChildState;
        };
        mergeCreateWorkdir: {
            method: 'POST';
            body: RubricMergeCreateWorkdirRequest;
            response: RubricMergeWorkdirResponse;
        };
        mergeStatus: {
            method: 'GET';
            query: {
                question_id: number;
                item_type: string;
            };
            body: never;
            response: RubricMergeStatusResponse;
        };
        mergeImportOutput: {
            method: 'POST';
            body: {
                question_id: number;
                item_type: string;
            };
            response: RubricMergeImportResponse;
        };
        mergeTrigger: {
            method: 'POST';
            body: RubricMergeTriggerRequest;
            response: RubricMergeTriggerResponse;
        };
        mergeComplete: {
            method: 'POST';
            params: {
                id: number;
            };
            body: never;
            response: RubricMergeCompleteResponse;
        };
        mergeJobStatus: {
            method: 'GET';
            params: {
                id: number;
            };
            body: never;
            response: RubricMergeJobStatusResponse;
        };
    };
    workdir: {
        answerCreate: {
            method: 'POST';
            body: AnswerWorkdirRequest;
            response: AnswerWorkdirResponse;
        };
        answerRebuild: {
            method: 'POST';
            body: AnswerWorkdirRequest;
            response: AnswerWorkdirResponse;
        };
        answerStatus: {
            method: 'GET';
            query: AnswerWorkdirStatusRequest;
            body: never;
            response: AnswerWorkdirStatusResponse;
        };
        answerOutputRead: {
            method: 'GET';
            query: {
                answer_id: number;
                question_id: number;
                student_name: string;
            };
            body: never;
            response: AnswerOutputReadResponse;
        };
        answerOutputWrite: {
            method: 'POST';
            body: AnswerOutputWriteRequest;
            response: AnswerOutputWriteResponse;
        };
        populationCreate: {
            method: 'POST';
            body: PopulationWorkdirRequest;
            response: PopulationWorkdirResponse;
        };
        populationOutputRead: {
            method: 'GET';
            query: {
                question_id: number;
                item_type: string;
            };
            body: never;
            response: PopulationOutputReadResponse;
        };
        populationBatchCreate: {
            method: 'POST';
            body: PopulationBatchWorkdirRequest;
            response: PopulationBatchWorkdirResponse;
        };
        populationBatchList: {
            method: 'GET';
            query: {
                question_id: number;
                item_type: string;
            };
            body: never;
            response: PopulationBatchListResponse;
        };
    };
}
export declare const RUNNER_API: {
    readonly jobs: {
        /** GET → Job[] */
        readonly list: "/api/jobs";
        /** POST RunnerJobRequest → RunnerJobResponse */
        readonly create: "/api/jobs";
        /** GET {id} → Job */
        readonly one: (id: number) => string;
        /** POST {id} → void */
        readonly stop: (id: number) => string;
    };
    readonly queue: {
        /** GET → RunnerQueueStatus */
        readonly status: "/api/queue/status";
        /** GET → { concurrency } */
        readonly concurrencyGet: "/api/queue/concurrency";
        /** PUT { concurrency } → { concurrency } */
        readonly concurrencySet: "/api/queue/concurrency";
        /** POST → void */
        readonly stopAll: "/api/queue/stop-all";
    };
    readonly answer: {
        /** POST AnswerBooleanqRequest → BooleanQOutput */
        readonly booleanq: "/api/answer/booleanq";
        /** POST AnswerCriterionRequest → CriterionOutput */
        readonly criterion: "/api/answer/criterion";
        /** POST AnswerCoherenceRequest → CoherenceOutput */
        readonly coherence: "/api/answer/coherence";
        /** POST AnswerSeedRequest → AnswerSeedResponse */
        readonly seed: "/api/answer/seed";
        /** POST AnswerForkRequest → CriterionOutput */
        readonly fork: "/api/answer/fork";
        /** POST AnswerManyStartRequest → AnswerManyStartResponse */
        readonly manyStart: "/api/answer/many";
        /** GET {id} → AnswerManyStatus */
        readonly manyStatus: (id: string) => string;
        /** POST {id} → void */
        readonly manyStop: (id: string) => string;
    };
    readonly rubricDraft: {
        /** POST RubricSeekRequest → RubricSeekResponse */
        readonly run: "/api/rubric-draft/run";
        /** GET {id} → RubricDraftStatus */
        readonly status: (id: number) => string;
        /** GET {id, answerId} → RubricDraftChildState */
        readonly answerStatus: (id: number, answerId: number) => string;
        /** POST RubricMergeCreateWorkdirRequest → RubricMergeWorkdirResponse */
        readonly mergeCreateWorkdir: "/api/rubric-draft/merge/create-workdir";
        /** GET { question_id, item_type } → RubricMergeStatusResponse */
        readonly mergeStatus: "/api/rubric-draft/merge/status";
        /** POST { question_id, item_type } → RubricMergeImportResponse */
        readonly mergeImportOutput: "/api/rubric-draft/merge/import-output";
        /** POST RubricMergeTriggerRequest → RubricMergeTriggerResponse */
        readonly mergeTrigger: "/api/rubric-draft/merge/trigger";
        /** POST {id} → RubricMergeCompleteResponse */
        readonly mergeComplete: (id: number) => string;
        /** GET {id} → RubricMergeJobStatusResponse */
        readonly mergeJobStatus: (id: number) => string;
    };
    readonly workdir: {
        /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
        readonly answerCreate: "/api/workdir/answer";
        /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
        readonly answerRebuild: "/api/workdir/answer/rebuild";
        /** GET AnswerWorkdirStatusRequest → AnswerWorkdirStatusResponse */
        readonly answerStatus: "/api/workdir/answer/status";
        /** GET { answer_id, question_id, student_name } → AnswerOutputReadResponse */
        readonly answerOutputRead: "/api/workdir/answer/output";
        /** POST AnswerOutputWriteRequest → AnswerOutputWriteResponse */
        readonly answerOutputWrite: "/api/workdir/answer/output";
        /** POST PopulationWorkdirRequest → PopulationWorkdirResponse */
        readonly populationCreate: "/api/workdir/population";
        /** GET { question_id, item_type } → PopulationOutputReadResponse */
        readonly populationOutputRead: "/api/workdir/population/output";
        /** POST PopulationBatchWorkdirRequest → PopulationBatchWorkdirResponse */
        readonly populationBatchCreate: "/api/workdir/population-batch";
        /** GET { question_id, item_type } → PopulationBatchListResponse */
        readonly populationBatchList: "/api/workdir/population-batch/list";
    };
};
//# sourceMappingURL=routes.d.ts.map