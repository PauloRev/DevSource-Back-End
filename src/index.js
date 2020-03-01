require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const databaseConfig = require("./config/database");

const app = express();
const port = process.env.PORT;

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose
  .connect(databaseConfig.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    server.listen(port, () => console.log(`server start in port ${port}`));
  })
  .catch(err => {
    if (err) {
      console.log("error in connect a database...");
    }
  });
