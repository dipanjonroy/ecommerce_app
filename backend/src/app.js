require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./dbConfig/connectToDb");

connectToDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(cors({
  origins: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}))

app.listen(port, () => {
  console.log("Server is running from port", port);
});
