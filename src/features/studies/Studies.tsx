import { Study } from '@/shared/types/Study'
import { StudiesList } from '@/features/studies/StudiesList'
import { StudiesFilter } from '@/features/studies/StudiesFilter'

export function Studies({ studies }: { studies: Study[] }) {
  return (
    <section className='flex flex-col gap-4'>
      <StudiesFilter />
      <StudiesList studies={studies} />
    </section>
  )
}
