require("dotenv").config();

const express = require("express");

const routes = require("./routes/ProductRouter");
const connectToDatabase = require("./database");

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("Backend started at http://localhost:3333");
});
