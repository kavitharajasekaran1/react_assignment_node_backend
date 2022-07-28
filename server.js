var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var AddTransaction = require("./Controllers/transactions");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
// routers
const transaction = require("./routes/transaction");

app.use("/api/v1/", transaction);

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
