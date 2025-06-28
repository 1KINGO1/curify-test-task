export interface StudyApiResponse {
	protocolSection: {
		identificationModule : {
			nctId: string,
			briefTitle: string
		},
		conditionsModule: {
			conditions: string[]
		}
	}
}