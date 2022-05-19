const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a2npr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
      const collection = client.db("dbadmin").collection("dbadmincollection");
      

      app.post("/list", async (req, res) => {
        const list = req.body;
        const result = await collection.insertOne(list);
        res.send(result);
      });



      app.get("/list", async (req, res) => {
          const cursor = collection.find();
          const result = await cursor.toArray()
        res.send(result);
      });




      app.delete("/list/:id", async (req, res) => {
          const id = req.params.id;
          console.log(id);
        const query = { _id: ObjectId(id) };
        const result = await collection.deleteOne(query);
        res.send(result);
      });




      app.put("/list/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const added= {
          $set: { finished: true },
        };
        const result = await collection.updateOne(query, added);
        res.send(result);
      });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// ================================================
app.get("/", (req, res) => {
  res.send("well come to to-do-app");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
