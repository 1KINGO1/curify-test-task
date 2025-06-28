import {URLS} from '@/shared/constants/urls';
import {createQueryParamsFromObject} from '@/shared/utils/createQueryParamsFromObject';
import {Study} from '@/shared/types/Study';
import {StudyApiResponse} from '@/shared/types/StudyApiResponse';
import {convertStudyApiResponseIntoStudy} from '@/shared/utils/convertStudyApiResponseIntoStudy';

interface GetStudiesParams {
	['query.cond']?: string;
	['countTotal']?: boolean;
	['pageSize']?: number;
	['pageToken']?: string;
}

interface GetStudiesApiResponse {
	studies: StudyApiResponse[];
	nextPageToken: string;
}

class ClinicalTrialsService {
	async getStudies(params: GetStudiesParams, next: NextFetchRequestConfig){
		const queryParams = createQueryParamsFromObject(params);
		queryParams.append('fields', 'protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions')

		const urlWithParams = `${URLS.GET_STUDIES}?${queryParams.toString()}`;

		const response = await fetch(urlWithParams, {next});
		const data: GetStudiesApiResponse = await response.json();

		if (!response.ok) {
			throw data;
		}

		const result: Study[] = data.studies.map(convertStudyApiResponseIntoStudy);

		return {
			studies: result,
			nextPageToken: data.nextPageToken
		};
	}

	async getStudyByNctId(nctId: string, next: NextFetchRequestConfig): Promise<Study> {
		const response = await fetch(URLS.GET_STUDY_BY_NCT_ID(nctId), {next});
		const data = await response.json();

		if (!response.ok) {
			throw data;
		}

		return convertStudyApiResponseIntoStudy(data);
	}
}

export const clinicalTrialsService = new ClinicalTrialsService();