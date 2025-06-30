import { Textarea } from '@/shared/components/ui/textarea'
import { useFormContext } from 'react-hook-form'
import { ApplicationSchema } from '@/shared/schemas/application.schema'

export function ApplicationPreview({ studyNct }: { studyNct: string }) {
  const form = useFormContext<ApplicationSchema>()
  const values = form.getValues()

  if (!form.formState.isValid) return null

  return (
    <Textarea
      className='resize-none min-h-[240px] max-h-[400px]'
      disabled
      value={`I hope this message finds you well. My name is ${values.firstName} ${values.lastName}, and I am writing to express my strong interest in participating in your upcoming clinical trial ${studyNct}.
You can contact me by replying directly to this email or reaching me by phone at ${values.phoneNumber} or ${values.emailAddress}
Thank you for considering my interest!`}
    />
  )
}
