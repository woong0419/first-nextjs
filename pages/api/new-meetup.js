import { MongoClient } from 'mongodb'



async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://dbUser:qwert123@cluster0.hu2r8.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)

        console.log(result)

        client.close()

        res.status(201).json({ message: 'inserted!' })
    }
}

export default handler