'use client'

import {Study} from '@/shared/types/Study';
import {useForm} from 'react-hook-form';
import {ApplicationSchema, applicationSchema} from '@/shared/schemas/application.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/components/ui/form';
import {Button} from '@/shared/components/ui/button';
import {Input} from '@/shared/components/ui/input';
import {ApplicationPreview} from '@/features/applications/ApplicationPreview';
import {Checkbox} from '@/shared/components/ui/checkbox';
import {applicationsService} from '@/shared/services/applications.service';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {cn} from '@/shared/utils/cn';

export function ApplicationForm({study}: { study: Study }) {
	const form = useForm<ApplicationSchema>({
		resolver: zodResolver(applicationSchema),
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			emailAddress: '',
			agreement: false
		}
	})
	const router = useRouter();

	const onSubmit = async (values: ApplicationSchema) => {
		try {
			await applicationsService.createApplication(values)
			toast.success("Application has been created")
			router.push('/')
		} catch (error) {
			toast.error("Failed to create the application", {
				description: (error as {message: string})?.message ?? 'An unexpected error occurred'
			})
		}
	}

	const isSubmittingAvailable = !form.formState.isSubmitting && form.formState.isValid;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="firstName"
					render={({field}) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Taras" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({field}) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Lys" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({field}) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input type="tel" {...field} placeholder="+3809512345678"/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="emailAddress"
					render={({field}) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} placeholder="user@gmail.com"/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="agreement"
					render={({field}) => (
						<FormItem>
							<div className='flex items-center gap-2'>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange}/>
								</FormControl>
								<FormLabel>I agree to privacy policy and terms of use</FormLabel>
							</div>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<ApplicationPreview studyNct={study.nctId}/>
				<Button
					type="submit"
					className='w-full'
					disabled={!isSubmittingAvailable}
				>
					{form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
				</Button>
			</form>
		</Form>
	);
}