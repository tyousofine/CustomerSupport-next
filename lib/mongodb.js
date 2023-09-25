import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;

async function run() {
    try {
        const database = client.db('tickets');
        const tickets = database.collection('tickets');

        // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'Back to the Future' };
        // const ticket = await tickets.findOne(query);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);