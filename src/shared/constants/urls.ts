export const CLINICAL_TRIALS_BASE_API = 'https://clinicaltrials.gov/api/v2'
export const BASE_API = '/api'

export const URLS = {
  GET_STUDIES: CLINICAL_TRIALS_BASE_API + '/studies',
  GET_STUDY_BY_NCT_ID: (nctId: string) =>
    CLINICAL_TRIALS_BASE_API + '/studies/' + nctId,
  POST_APPLICATION: BASE_API + '/applications',
} as const
