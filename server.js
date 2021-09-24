const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('tiny'));


app.post("/post", (req, res) => {
  res.redirect('/')
});


  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));