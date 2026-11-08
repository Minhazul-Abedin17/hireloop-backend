import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb";


const app = express()
const port =process.env.PORT || 8000

app.use(express.json())
app.use(cors())

const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB();
const db = mongoClient.db('hireloop')
const user = db.collection('user')
const jobs = db.collection('jobs')



app.get('/', (req, res) => {
  res.send('Hello World!')
})

//http://localhost:8000/users

app.get('/users',async(req,res)=>{
    const data = user.find({})
    const result = await data.toArray()
    res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})