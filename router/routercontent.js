const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

require("dotenv").config();
//connect to DB

router.get("/", (req, res) => {
  main().catch((err) => console.log(err));

  async function main() {
    const client = new MongoClient(process.env.DB_URL);
    const { index, type } = req.query;
    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await listDatabases(client, index, type);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  async function listDatabases(client, index, type) {
    await client
      .db("contentWeb")
      .collection("dataposts")
      .find({
        collectionPost: type,
      })
      .toArray()
      .then((data) => {
        let newdata = data[0].dataPost.filter((value, index1) => {
          return index1 == index;
        });
        res.json({ content: newdata });
      });

    await client
      .db("contentWeb")
      .collection("dataposts")
      .updateOne(
        {
          collectionPost: type,
        },
        { $inc: { ["viewPost."+index]: 1 } }
      )
      
  }
});

module.exports = router;
