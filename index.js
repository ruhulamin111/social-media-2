const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('social media server')
})
app.listen(port, () => {
    console.log('social media server running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const postCollection = client.db('posts').collection('post')

        app.get('/posts', async (req, res) => {
            const result = await postCollection.find({}).toArray();
            res.send(result)
        })

        app.post('/posts', async (req, res) => {
            const body = req.body;
            console.log('body');
            const posts = {
                name: 'ruhul',
                age: 12,
                address: 'dhaka',
            }
            const result = await postCollection.insertOne(posts);
            res.send(result)
        })

        app.get('/auth', async (req, res) => {
            res.send('auth endpoint')
        })
        app.get('/register', async (req, res) => {
            res.send('register endpoint')
        })




    } catch (error) {
        console.log(error);
    } finally {

    }
}
run().catch(console.dir)
