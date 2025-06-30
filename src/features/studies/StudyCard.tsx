import { Study } from '@/shared/types/Study'
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'

export function StudyCard({ study }: { study: Study }) {
  return (
    <Card className='p-3 text-center'>
      <CardTitle>
        <p className='text-xl'>{study.title}</p>
      </CardTitle>
      <CardContent>
        <p className='text-lg'>Conditions:</p>
        <ul className='flex flex-col gap-1 mt-2 items-center'>
          {study.conditions.map(condition => (
            <li key={condition} className='bg-muted py-1 px-2 rounded-sm'>
              {condition}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Link href={'/application/' + study.nctId}>
          <Button>Apply To Trial</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
