const { port, env } = require("./Config/Config");
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

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Page Not Found" });
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ status: false, message: "Page Not Found", err });
});

app.listen(port, () => {
  if (env == 'local') {
    console.log(`Server is Running on Port No :- http://localhost:${port}`);
  } else {
    console.log(`Server is Running on Port No :- https://hrms-dhy1.onrender.com`);
  }
});
