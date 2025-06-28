import z from "zod";

export const applicationSchema = z.object({
	firstName: z.string().nonempty({
		message: "First Name must not be empty.",
	}),
	lastName: z.string().nonempty({
		message: "Last Name must not be empty.",
	}),
	phoneNumber: z.string()
		.nonempty({
			message: "Phone Number must not be empty.",
		})
		.refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value), {
			message: "Invalid phone number format.",
		}),
	emailAddress: z.string()
		.nonempty({
			message: "Email Address must not be empty.",
		}).email({
			message: "Invalid email address.",
		}),
	agreement: z.boolean().refine((value) => value === true, {
		message: "Please agree to the terms and conditions.",
	})
})

export type ApplicationSchema = z.infer<typeof applicationSchema>;