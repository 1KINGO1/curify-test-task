import { clinicalTrialsService } from '@/shared/services/clinical-trials.service'
import { ApplicationForm } from '@/features/applications/ApplicationForm'

export default async function Application({
  params: paramsPromise,
}: {
  params: Promise<{ nct: string }>
}) {
  const params = await paramsPromise

  const study = await clinicalTrialsService.getStudyByNctId(params.nct, {
    revalidate: 60,
  })

  return <ApplicationForm study={study} />
}
