import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL!;
const options = {};

if (!uri) {
	throw new Error('Please add your DATABASE_URL to .env');
}

const client = new MongoClient(uri, options);
export const clientPromise = client.connect();