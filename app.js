const { port } = require("./Config/Config");
const express = require("express");
const app = express();
const cors = require("cors");
const indexRouter = require("./Routers/index");
const database = require("./Config/Database");

database();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server is Running on Port No :- http://localhost:${port}`);
});
