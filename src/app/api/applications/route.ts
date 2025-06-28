import { NextResponse } from "next/server";
import z from "zod";
import {applicationSchema} from '@/shared/schemas/application.schema';
import {clientPromise} from '@/lib/mongodb';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsed = applicationSchema.parse(body);

		const client = await clientPromise;
		const db = client.db('studies-project');

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {agreement, ...applicationFields} = parsed;
		const applicationBody = {
			...applicationFields,
			createdAt: new Date(),
		}
		await db.collection('applications').insertOne(applicationBody);

		return NextResponse.json({
			success: true,
			data: applicationBody,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}