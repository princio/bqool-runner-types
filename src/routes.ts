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
    list:   `${BASE}/jobs`,
    create: `${BASE}/jobs`,
    one:    (id: number) => `${BASE}/jobs/${id}`,
    stop:   (id: number) => `${BASE}/jobs/${id}/stop`,
  },
  queue: {
    status:  `${BASE}/queue/status`,
    stopAll: `${BASE}/queue/stop-all`,
  },
  answer: {
    booleanq:    `${BASE}/answer/booleanq`,
    criterion:   `${BASE}/answer/criterion`,
    coherence:   `${BASE}/answer/coherence`,
    seed:        `${BASE}/answer/seed`,
    fork:        `${BASE}/answer/fork`,
    manyStart:  `${BASE}/answer/many`,
    manyStatus: (id: string) => `${BASE}/answer/many/${id}`,
    manyStop:   (id: string) => `${BASE}/answer/many/${id}/stop`,
  },
  rubricSeek: {
    run:         `${BASE}/rubric-seek/run`,
    batchStart:  `${BASE}/rubric-seek/batch`,
    batchStatus: (id: string) => `${BASE}/rubric-seek/batch/${id}`,
    batchStop:   (id: string) => `${BASE}/rubric-seek/batch/${id}/stop`,
  },
  rubricDraft: {
    run:         `${BASE}/rubric-draft/run`,
    status:      (id: number) => `${BASE}/rubric-draft/${id}`,
    answerStatus:(id: number, answerId: number) => `${BASE}/rubric-draft/${id}/answer/${answerId}`,
  },
  rubricMerge: {
    createWorkdir: `${BASE}/rubric-merge/create-workdir`,
    status:        `${BASE}/rubric-merge/status`,
    importOutput:  `${BASE}/rubric-merge/import-output`,
    trigger:       `${BASE}/rubric-merge/trigger`,
    complete:      (id: number) => `${BASE}/rubric-merge/${id}/complete`,
    jobStatus:     (id: number) => `${BASE}/rubric-merge/${id}`,
  },
  workdir: {
    answerCreate:          `${BASE}/workdir/answer`,
    answerRebuild:         `${BASE}/workdir/answer/rebuild`,
    answerStatus:          `${BASE}/workdir/answer/status`,
    answerOutputRead:      `${BASE}/workdir/answer/output`,
    answerOutputWrite:     `${BASE}/workdir/answer/output`,
    populationCreate:      `${BASE}/workdir/population`,
    populationOutputRead:  `${BASE}/workdir/population/output`,
    populationBatchCreate: `${BASE}/workdir/population-batch`,
    populationBatchList:   `${BASE}/workdir/population-batch/list`,
  },
} as const;
