const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

require("dotenv").config();

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
    await client
      .db("contentWeb")
      .collection("dataposts")
      .find({
        collectionPost: type,
      })
      .toArray()
      .then((data) => {
        res.json({ content: data[0].viewPost });
      });
  }
});

router.get("/All", (req, res) => {
  main().catch((err) => console.log(err));

  async function main() {
    const client = new MongoClient(process.env.DB_URL);

    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await listDatabases(client);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  async function listDatabases(client) {
    await client
      .db("contentWeb")
      .collection("dataposts")
      .find({})
      .toArray()
      .then((data) => {
        var newdata= data.map((value) => value.viewPost.reduce((a, b) => a + b))        
        res.json({
          content: newdata,
        });
      });
  }
});
module.exports = router;
