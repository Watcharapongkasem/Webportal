const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("dotenv").config();
//connect to DB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

//new Schema
const dataPost = mongoose.Schema({
  collectionPost: { type: String },
  dataPost: [String],
  viewPost: [Number],
  authorPost: String,
});

//new model for infoUser
const newPost = mongoose.model("dataPost", dataPost);

router.post("/", express.json(), (req, res) => {
  const { collectionPost, dataPost, viewPost, authorPost } = req.body;
  newPost.findOne({ collectionPost }).exec((err, data) => {
    if (data == null) {
      const startCollection = new newPost({
        collectionPost,
        dataPost,
        viewPost,
        authorPost,
      });
      startCollection.save(() => {
        res.json({ save: "complete" });
      });
    } else {
      data.dataPost = [dataPost, ...data.dataPost];
      data.viewPost = [viewPost,...data.viewPost];
      data.save(() => {
        res.json({ save: "complete" });
      });
    }
  });
});

router.get("/:collectionPost", (req, res) => {
  const { collectionPost } = req.params;
  console.log(collectionPost);
  if (collectionPost !== "ALL") {
    newPost.findOne({ collectionPost }).exec((err, data) => {
      if (!err && data != null) {
        res.json({ dataPost: data.dataPost });
      } else {
        res.json({ dataPost: ["No data"] });
      }
    });
  } else {
    newPost
      .find({ collectionPost: { $in: ["House", "Game", "Pet", "Other"] } })
      .exec((err, data) => {
        if (!err && data != null) {
          res.json({
            dataPost: data.map((value) => {
              return value.dataPost;
            }),
          });
        } else {
          res.json({ dataPost: ["No data"] });
        }
      });
  }
});

router.delete("/", express.json(), (req, res) => {
  const { typecollect, index1 } = req.body;
  newPost.findOne({ collectionPost: typecollect }).exec((err, data) => {
    if (data === null) {
      res.json({ res: "empty" });
    } else {
      data.dataPost = data.dataPost.filter((value, index) => {
        return index != index1;
      });
      data.viewPost = data.viewPost.filter((value, index) => {
        return index != index1;
      });
      data.save((err, data) => {
        if (!err) {
          res.json({ res: "ok" });
        }
      });
    }
  });
});

router.patch("/", express.json(), (req, res) => {
  const { typePost, EditPost, index } = req.body;
  const queryindex = "dataPost." + String(index);
  newPost
    .updateOne(
      { collectionPost: typePost },
      { $set: { [queryindex]: EditPost } }
    )
    .exec((err, data) => {
      if (!err) {
        res.json({ res: "update data" });
      }
    });
});

module.exports = router;
