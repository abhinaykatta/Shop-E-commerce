const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/db");
const authRouter = require("./routes/authRoute");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();
require("dotenv").config();
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World!</h1>");
});

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
