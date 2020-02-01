require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const databaseConfig = require("./config/database");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(routes);

mongoose
  .connect(databaseConfig.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => console.log(`server start in port ${port}`));
  })
  .catch(err => {
    if (err) {
      console.log("error in connect a database...");
    }
  });
