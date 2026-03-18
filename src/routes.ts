import type {
  Job,
  JobListQuery,
  RunnerJobRequest,
  RunnerJobResponse,
  RunnerQueueStatus,
} from './job';
import type {
  AnswerBooleanqRequest,
  AnswerCriterionRequest,
  AnswerCoherenceRequest,
  AnswerSeedRequest,
  AnswerSeedResponse,
  AnswerForkRequest,
  AnswerManyStartRequest,
  AnswerManyStartResponse,
  AnswerManyStatus,
  BooleanQOutput,
  CriterionOutput,
  CoherenceOutput,
} from './answer';
import type {
  RubricSeekRequest,
  RubricSeekOutput,
  RubricSeekBatchStartRequest,
  RubricSeekBatchStartResponse,
  RubricSeekBatchStatus,
} from './rubric-seek';
import type {
  RubricDraftStartRequest,
  RubricDraftStartResponse,
  RubricDraftStatus,
  RubricDraftChildState,
} from './rubric-draft';
import type {
  RubricMergeCreateWorkdirRequest,
  RubricMergeWorkdirResponse,
  RubricMergeStatusResponse,
  RubricMergeImportResponse,
  RubricMergeTriggerRequest,
  RubricMergeTriggerResponse,
  RubricMergeCompleteResponse,
  RubricMergeJobStatusResponse,
} from './rubric-merge';
import type {
  AnswerWorkdirRequest,
  AnswerWorkdirResponse,
  AnswerWorkdirStatusRequest,
  AnswerWorkdirStatusResponse,
  AnswerOutputReadResponse,
  AnswerOutputWriteRequest,
  AnswerOutputWriteResponse,
  PopulationWorkdirRequest,
  PopulationWorkdirResponse,
  PopulationOutputReadResponse,
  PopulationBatchWorkdirRequest,
  PopulationBatchWorkdirResponse,
  PopulationBatchListResponse,
} from './workdir';

/**
 * Maps each route key to its HTTP method, body, params, query, and response types.
 *
 * Provides a single source of truth tying RUNNER_API routes to their HTTP contract.
 */
export interface RunnerApiTypeMap {
  jobs: {
    list:   { method: 'GET';  query: JobListQuery; body: never; response: Job[] };
    create: { method: 'POST'; body: RunnerJobRequest; response: RunnerJobResponse };
    one:    { method: 'GET';  params: { id: number }; body: never; response: Job };
    stop:   { method: 'POST'; params: { id: number }; body: never; response: void };
  };
  queue: {
    status:      { method: 'GET';  body: never; response: RunnerQueueStatus };
    concurrencyGet: { method: 'GET'; body: never; response: { concurrency: number } };
    concurrencySet: { method: 'PUT'; body: { concurrency: number }; response: { concurrency: number } };
    stopAll:     { method: 'POST'; body: never; response: void };
  };
  answer: {
    booleanq:   { method: 'POST'; body: AnswerBooleanqRequest;   response: BooleanQOutput };
    criterion:  { method: 'POST'; body: AnswerCriterionRequest;  response: CriterionOutput };
    coherence:  { method: 'POST'; body: AnswerCoherenceRequest;  response: CoherenceOutput };
    seed:       { method: 'POST'; body: AnswerSeedRequest;       response: AnswerSeedResponse };
    fork:       { method: 'POST'; body: AnswerForkRequest;       response: CriterionOutput };
    manyStart:  { method: 'POST'; body: AnswerManyStartRequest;  response: AnswerManyStartResponse };
    manyStatus: { method: 'GET';  params: { id: string }; body: never; response: AnswerManyStatus };
    manyStop:   { method: 'POST'; params: { id: string }; body: never; response: void };
  };
  rubricSeek: {
    run:         { method: 'POST'; body: RubricSeekRequest;           response: RubricSeekOutput };
    batchStart:  { method: 'POST'; body: RubricSeekBatchStartRequest; response: RubricSeekBatchStartResponse };
    batchStatus: { method: 'GET';  params: { id: string }; body: never; response: RubricSeekBatchStatus };
    batchStop:   { method: 'POST'; params: { id: string }; body: never; response: void };
  };
  rubricDraft: {
    run:          { method: 'POST'; body: RubricDraftStartRequest; response: RubricDraftStartResponse };
    status:       { method: 'GET';  params: { id: number }; body: never; response: RubricDraftStatus };
    answerStatus: { method: 'GET';  params: { id: number; answerId: number }; body: never; response: RubricDraftChildState };
  };
  rubricMerge: {
    createWorkdir: { method: 'POST'; body: RubricMergeCreateWorkdirRequest; response: RubricMergeWorkdirResponse };
    status:        { method: 'GET';  query: { question_id: number; item_type: string }; body: never; response: RubricMergeStatusResponse };
    importOutput:  { method: 'POST'; body: { question_id: number; item_type: string }; response: RubricMergeImportResponse };
    trigger:       { method: 'POST'; body: RubricMergeTriggerRequest; response: RubricMergeTriggerResponse };
    complete:      { method: 'POST'; params: { id: number }; body: never; response: RubricMergeCompleteResponse };
    jobStatus:     { method: 'GET';  params: { id: number }; body: never; response: RubricMergeJobStatusResponse };
  };
  workdir: {
    answerCreate:          { method: 'POST'; body: AnswerWorkdirRequest;         response: AnswerWorkdirResponse };
    answerRebuild:         { method: 'POST'; body: AnswerWorkdirRequest;         response: AnswerWorkdirResponse };
    answerStatus:          { method: 'GET';  query: AnswerWorkdirStatusRequest;  body: never; response: AnswerWorkdirStatusResponse };
    answerOutputRead:      { method: 'GET';  query: { answer_id: number; question_id: number; student_name: string }; body: never; response: AnswerOutputReadResponse };
    answerOutputWrite:     { method: 'POST'; body: AnswerOutputWriteRequest;     response: AnswerOutputWriteResponse };
    populationCreate:      { method: 'POST'; body: PopulationWorkdirRequest;     response: PopulationWorkdirResponse };
    populationOutputRead:  { method: 'GET';  query: { question_id: number; item_type: string }; body: never; response: PopulationOutputReadResponse };
    populationBatchCreate: { method: 'POST'; body: PopulationBatchWorkdirRequest; response: PopulationBatchWorkdirResponse };
    populationBatchList:   { method: 'GET';  query: { question_id: number; item_type: string }; body: never; response: PopulationBatchListResponse };
  };
}

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

export const RUNNER_API = {
  jobs: {
    /** GET → Job[] */
    list:   `${BASE}/jobs`,
    /** POST RunnerJobRequest → RunnerJobResponse */
    create: `${BASE}/jobs`,
    /** GET {id} → Job */
    one:    (id: number) => `${BASE}/jobs/${id}`,
    /** POST {id} → void */
    stop:   (id: number) => `${BASE}/jobs/${id}/stop`,
  },
  queue: {
    /** GET → RunnerQueueStatus */
    status:         `${BASE}/queue/status`,
    /** GET → { concurrency } */
    concurrencyGet: `${BASE}/queue/concurrency`,
    /** PUT { concurrency } → { concurrency } */
    concurrencySet: `${BASE}/queue/concurrency`,
    /** POST → void */
    stopAll:        `${BASE}/queue/stop-all`,
  },
  answer: {
    /** POST AnswerBooleanqRequest → BooleanQOutput */
    booleanq:   `${BASE}/answer/booleanq`,
    /** POST AnswerCriterionRequest → CriterionOutput */
    criterion:  `${BASE}/answer/criterion`,
    /** POST AnswerCoherenceRequest → CoherenceOutput */
    coherence:  `${BASE}/answer/coherence`,
    /** POST AnswerSeedRequest → AnswerSeedResponse */
    seed:       `${BASE}/answer/seed`,
    /** POST AnswerForkRequest → CriterionOutput */
    fork:       `${BASE}/answer/fork`,
    /** POST AnswerManyStartRequest → AnswerManyStartResponse */
    manyStart:  `${BASE}/answer/many`,
    /** GET {id} → AnswerManyStatus */
    manyStatus: (id: string) => `${BASE}/answer/many/${id}`,
    /** POST {id} → void */
    manyStop:   (id: string) => `${BASE}/answer/many/${id}/stop`,
  },
  rubricSeek: {
    /** POST RubricSeekRequest → RubricSeekOutput */
    run:         `${BASE}/rubric-seek/run`,
    /** POST RubricSeekBatchStartRequest → RubricSeekBatchStartResponse */
    batchStart:  `${BASE}/rubric-seek/batch`,
    /** GET {id} → RubricSeekBatchStatus */
    batchStatus: (id: string) => `${BASE}/rubric-seek/batch/${id}`,
    /** POST {id} → void */
    batchStop:   (id: string) => `${BASE}/rubric-seek/batch/${id}/stop`,
  },
  rubricDraft: {
    /** POST RubricDraftStartRequest → RubricDraftStartResponse */
    run:          `${BASE}/rubric-draft/run`,
    /** GET {id} → RubricDraftStatus */
    status:       (id: number) => `${BASE}/rubric-draft/${id}`,
    /** GET {id, answerId} → RubricDraftChildState */
    answerStatus: (id: number, answerId: number) => `${BASE}/rubric-draft/${id}/answer/${answerId}`,
  },
  rubricMerge: {
    /** POST RubricMergeCreateWorkdirRequest → RubricMergeWorkdirResponse */
    createWorkdir: `${BASE}/rubric-merge/create-workdir`,
    /** GET { question_id, item_type } → RubricMergeStatusResponse */
    status:        `${BASE}/rubric-merge/status`,
    /** POST { question_id, item_type } → RubricMergeImportResponse */
    importOutput:  `${BASE}/rubric-merge/import-output`,
    /** POST RubricMergeTriggerRequest → RubricMergeTriggerResponse */
    trigger:       `${BASE}/rubric-merge/trigger`,
    /** POST {id} → RubricMergeCompleteResponse */
    complete:      (id: number) => `${BASE}/rubric-merge/${id}/complete`,
    /** GET {id} → RubricMergeJobStatusResponse */
    jobStatus:     (id: number) => `${BASE}/rubric-merge/${id}`,
  },
  workdir: {
    /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
    answerCreate:          `${BASE}/workdir/answer`,
    /** POST AnswerWorkdirRequest → AnswerWorkdirResponse */
    answerRebuild:         `${BASE}/workdir/answer/rebuild`,
    /** GET AnswerWorkdirStatusRequest → AnswerWorkdirStatusResponse */
    answerStatus:          `${BASE}/workdir/answer/status`,
    /** GET { answer_id, question_id, student_name } → AnswerOutputReadResponse */
    answerOutputRead:      `${BASE}/workdir/answer/output`,
    /** POST AnswerOutputWriteRequest → AnswerOutputWriteResponse */
    answerOutputWrite:     `${BASE}/workdir/answer/output`,
    /** POST PopulationWorkdirRequest → PopulationWorkdirResponse */
    populationCreate:      `${BASE}/workdir/population`,
    /** GET { question_id, item_type } → PopulationOutputReadResponse */
    populationOutputRead:  `${BASE}/workdir/population/output`,
    /** POST PopulationBatchWorkdirRequest → PopulationBatchWorkdirResponse */
    populationBatchCreate: `${BASE}/workdir/population-batch`,
    /** GET { question_id, item_type } → PopulationBatchListResponse */
    populationBatchList:   `${BASE}/workdir/population-batch/list`,
  },
} as const;
