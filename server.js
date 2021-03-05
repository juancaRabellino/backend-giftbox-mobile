require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
require("./config/database");
var fileupload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());

app.use("/api", router);

const port = process.env.PORT || 4000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => console.log("App listening on port 4000"));