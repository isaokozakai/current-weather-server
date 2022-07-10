import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const client = new MongoClient(MONGO_URL);

const db = client.db('database');
export const Users = db.collection('users');
