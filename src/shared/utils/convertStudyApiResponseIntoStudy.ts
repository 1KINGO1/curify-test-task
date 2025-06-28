import {StudyApiResponse} from '@/shared/types/StudyApiResponse';
import {Study} from '@/shared/types/Study';

export function convertStudyApiResponseIntoStudy(studyApiResponse: StudyApiResponse): Study {
	return {
		nctId: studyApiResponse.protocolSection.identificationModule.nctId,
		title: studyApiResponse.protocolSection.identificationModule.briefTitle,
		conditions: studyApiResponse.protocolSection.conditionsModule.conditions,
	};
}