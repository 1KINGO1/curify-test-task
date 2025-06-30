import { Studies } from '@/features/studies/Studies'
import { clinicalTrialsService } from '@/shared/services/clinical-trials.service'

export default async function Home({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ search: string }>
}) {
  const searchParams = await searchParamsPromise

  const { studies } = await clinicalTrialsService.getStudies(
    {
      'query.cond': searchParams.search?.toLowerCase(),
    },
    {
      revalidate: 120,
    },
  )

  return <Studies studies={studies} />
}
