const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routerLogin = require('./router/routerLogin');
const routerHome = require('./router/routerHome');
const routerPost = require('./router/routerPost');
require('dotenv').config()

const multer = require('multer')
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }
    }
);

var upload = multer( { storage: storage } );

app.use(cors());
app.use(morgan("tiny"));
app.use('/login',routerLogin);
app.use('/home',routerHome);
app.use('/post',routerPost);
app.post("/uploads",upload.any(),(req,res)=>{
    console.log(req.file)
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
