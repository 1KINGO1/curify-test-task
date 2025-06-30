import { MongoClient } from 'mongodb'

const url = process.env.DATABASE_URL!
const options = {}

if (!url) {
  throw new Error('Please add your DATABASE_URL to .env')
}

const client = new MongoClient(url, options)
export const clientPromise = client.connect()
