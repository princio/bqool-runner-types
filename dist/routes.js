"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUNNER_API = void 0;
/**
 * API route constants for the bqool runner.
 *
 * Ground-truth for all runner endpoints. Must be kept in sync with bqool-runner controllers.
 * All paths include the `/api` prefix. Parameterized routes are functions.
 *
 * @example
 *   fetch(RUNNER_API.jobs.one(42))
 *   fetch(RUNNER_API.answer.criterion)
 */
const BASE = '/api';
exports.RUNNER_API = {
    jobs: {
        /** GET → Job[] */
        list: `${BASE}/jobs`,
        /** POST RunnerJobRequest → RunnerJobResponse */
        create: `${BASE}/jobs`,
        /** GET {id} → Job */
        one: (id) => `${BASE}/jobs/${id}`,
        /** POST {id} → void */
        stop: (id) => `${BASE}/jobs/${id}/stop`,
    },
    queue: {
        /** GET → RunnerQueueStatus */
        status: `${BASE}/queue/status`,
        /** GET → { concurrency } */
        concurrencyGet: `${BASE}/queue/concurrency`,
        /** PUT { concurrency } → { concurrency } */
        concurrencySet: `${BASE}/queue/concurrency`,
        /** POST → void */
        stopAll: `${BASE}/queue/stop-all`,
    },
    answer: {
        /** POST AnswerBooleanqRequest → BooleanQOutput */
        booleanq: `${BASE}/answer/booleanq`,
        /** POST AnswerCriterionRequest → CriterionOutput */
        criterion: `${BASE}/answer/criterion`,
        /** POST AnswerCoherenceRequest → CoherenceOutput */
        coherence: `${BASE}/answer/coherence`,
        /** POST AnswerSeedRequest → AnswerSeedResponse */
        seed: `${BASE}/answer/seed`,
        /** POST AnswerForkRequest → CriterionOutput */
        fork: `${BASE}/answer/fork`,
        /** POST AnswerManyStartRequest → AnswerManyStartResponse */
        manyStart: `${BASE}/answer/many`,
        /** GET {id} → AnswerManyStatus */
        manyStatus: (id) => `${BASE}/answer/many/${id}`,
        /** POST {id} → void */
        manyStop: (id) => `${BASE}/answer/many/${id}/stop`,
    },
    rubricDraft: {
        /** POST RubricSeekRequest → RubricSeekResponse */
        run: `${BASE}/rubric-draft/run`,
        /** GET {id} → RubricDraftStatus */
        status: (id) => `${BASE}/rubric-draft/${id}`,
        /** GET {id, answerId} → RubricDraftChildState */
        answerStatus: (id, answerId) => `${BASE}/rubric-draft/${id}/answer/${answerId}`,
        /** POST RubricMergeCreateWorkdirRequest → RubricMergeWorkdirResponse */
        mergeCreateWorkdir: `${BASE}/rubric-draft/merge/create-workdir`,
        /** GET { question_id, item_type } → RubricMergeStatusResponse */
        mergeStatus: `${BASE}/rubric-draft/merge/status`,
        /** POST { question_id, item_type } → RubricMergeImportResponse */
        mergeImportOutput: `${BASE}/rubric-draft/merge/import-output`,
        /** POST RubricMergeTriggerRequest → RubricMergeTriggerResponse */
        mergeTrigger: `${BASE}/rubric-draft/merge/trigger`,
        /** POST {id} → RubricMergeCompleteResponse */
        mergeComplete: (id) => `${BASE}/rubric-draft/merge/${id}/complete`,
        /** GET {id} → RubricMergeJobStatusResponse */
        mergeJobStatus: (id) => `${BASE}/rubric-draft/merge/${id}`,
    },
    workdir: {
        /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
        answerCreate: `${BASE}/workdir/answer`,
        /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
        answerRebuild: `${BASE}/workdir/answer/rebuild`,
        /** GET AnswerWorkdirStatusRequest → AnswerWorkdirStatusResponse */
        answerStatus: `${BASE}/workdir/answer/status`,
        /** GET { answer_id, question_id, student_name } → AnswerOutputReadResponse */
        answerOutputRead: `${BASE}/workdir/answer/output`,
        /** POST AnswerOutputWriteRequest → AnswerOutputWriteResponse */
        answerOutputWrite: `${BASE}/workdir/answer/output`,
        /** POST PopulationWorkdirRequest → PopulationWorkdirResponse */
        populationCreate: `${BASE}/workdir/population`,
        /** GET { question_id, item_type } → PopulationOutputReadResponse */
        populationOutputRead: `${BASE}/workdir/population/output`,
        /** POST PopulationBatchWorkdirRequest → PopulationBatchWorkdirResponse */
        populationBatchCreate: `${BASE}/workdir/population-batch`,
        /** GET { question_id, item_type } → PopulationBatchListResponse */
        populationBatchList: `${BASE}/workdir/population-batch/list`,
    },
};
