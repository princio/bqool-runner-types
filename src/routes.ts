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
  RubricSeekResponse,
  RubricDraftStatus,
  RubricDraftChildState,
  RubricMergeCreateWorkdirRequest,
  RubricMergeWorkdirResponse,
  RubricMergeStatusResponse,
  RubricMergeImportResponse,
  RubricMergeTriggerRequest,
  RubricMergeTriggerResponse,
  RubricMergeCompleteResponse,
  RubricMergeJobStatusResponse,
} from './rubric-draft';
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
  rubricDraft: {
    run:           { method: 'POST'; body: RubricSeekRequest;     response: RubricSeekResponse };
    status:        { method: 'GET';  params: { id: number }; body: never; response: RubricDraftStatus };
    answerStatus:  { method: 'GET';  params: { id: number; answerId: number }; body: never; response: RubricDraftChildState };
    mergeCreateWorkdir: { method: 'POST'; body: RubricMergeCreateWorkdirRequest; response: RubricMergeWorkdirResponse };
    mergeStatus:        { method: 'GET';  query: { question_id: number; item_type: string }; body: never; response: RubricMergeStatusResponse };
    mergeImportOutput:  { method: 'POST'; body: { question_id: number; item_type: string }; response: RubricMergeImportResponse };
    mergeTrigger:       { method: 'POST'; body: RubricMergeTriggerRequest; response: RubricMergeTriggerResponse };
    mergeComplete:      { method: 'POST'; params: { id: number }; body: never; response: RubricMergeCompleteResponse };
    mergeJobStatus:     { method: 'GET';  params: { id: number }; body: never; response: RubricMergeJobStatusResponse };
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
  rubricDraft: {
    /** POST RubricSeekRequest → RubricSeekResponse */
    run:           `${BASE}/rubric-draft/run`,
    /** GET {id} → RubricDraftStatus */
    status:        (id: number) => `${BASE}/rubric-draft/${id}`,
    /** GET {id, answerId} → RubricDraftChildState */
    answerStatus:  (id: number, answerId: number) => `${BASE}/rubric-draft/${id}/answer/${answerId}`,
    /** POST RubricMergeCreateWorkdirRequest → RubricMergeWorkdirResponse */
    mergeCreateWorkdir: `${BASE}/rubric-draft/merge/create-workdir`,
    /** GET { question_id, item_type } → RubricMergeStatusResponse */
    mergeStatus:        `${BASE}/rubric-draft/merge/status`,
    /** POST { question_id, item_type } → RubricMergeImportResponse */
    mergeImportOutput:  `${BASE}/rubric-draft/merge/import-output`,
    /** POST RubricMergeTriggerRequest → RubricMergeTriggerResponse */
    mergeTrigger:       `${BASE}/rubric-draft/merge/trigger`,
    /** POST {id} → RubricMergeCompleteResponse */
    mergeComplete:      (id: number) => `${BASE}/rubric-draft/merge/${id}/complete`,
    /** GET {id} → RubricMergeJobStatusResponse */
    mergeJobStatus:     (id: number) => `${BASE}/rubric-draft/merge/${id}`,
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
