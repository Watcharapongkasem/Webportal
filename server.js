const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routerLogin = require('./router/routerLogin');
const routerHome = require('./router/routerHome');
require('dotenv').config()

app.use(cors());
app.use(morgan("tiny"));
app.use('/login',routerLogin);
app.use('/home',routerHome);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
