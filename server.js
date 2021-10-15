const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routerLogin = require("./router/routerLogin");
const routerHome = require("./router/routerHome");
const routerPost = require("./router/routerPost");
const routercontent = require("./router/routercontent");
const routerDashboard = require("./router/routerDashboard");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    let filename = Date.now() + "-" + file.originalname;
    req.body.file = filename;
    console.log(file);
    cb(null, filename);
  },
});

var upload = multer({ storage: storage });

app.use(cors());
app.use(morgan("tiny"));
app.use("/login", routerLogin);
app.use("/home", routerHome);
app.use("/post", routerPost);
app.use("/uploads", express.static("uploads"));
app.post("/uploads", upload.any(), (req, res) => {
  const getUrlpath = "uploads/" + req.body.file;
  res.status(200).json({
    uploaded: true,
    url: `http://localhost:4000/${getUrlpath}`,
  });
});
app.use("/content", routercontent);
app.use("/dashboard", routerDashboard);


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
