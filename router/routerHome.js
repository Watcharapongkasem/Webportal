const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

require("dotenv").config();
//connect to DB

router.get("/", (req, res) => {
  main().catch((err) => console.log(err));

  async function main() {
    const client = new MongoClient(process.env.DB_URL);
    const { type } = req.query;
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
      await listDatabases(client, type);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  async function listDatabases(client, type) {
    if (type !== "All") {
      await client
        .db("contentWeb")
        .collection("dataposts")
        .find({
          collectionPost: type,
        })
        .toArray()
        .then((data) => {          
          let newdata = data[0].dataPost;
          res.json({ content: newdata });
        });
    } else {
      await client
        .db("contentWeb")
        .collection("dataposts")
        .find({})
        .toArray()
        .then((data) => {
          var newdata= data.map((value) => value.dataPost)   
          console.log(newdata)       
          res.json({ content: newdata });
        });
    }
  }
});

module.exports = router;
