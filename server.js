const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bankRoute = require('./routes/bank')
const accountRoute = require('./routes/account')

//create express server instance
const server = express();

//middleware
server.use(bodyParser.json());

//routes
server.use(bankRoute)
server.use(accountRoute)

// connect to database and start server
mongoose
  .connect(
    "mongodb+srv://augustine:learnmongodb2022@gameapi.y4lpg.mongodb.net/banksapi?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(PORT, () => {
      const url = `http://localhost:${PORT}`;
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
