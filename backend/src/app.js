require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./dbConfig/connectToDb");
const ExpressError = require("../../../Uber/backend/src/utility/expresserror");

connectToDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origins: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

//Error handeling

app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found."));
});

app.use((err, req, res, next) => {
  const { status = 501, message = "Server side issue" } = err;
  res.status(status).json({
    success: false,
    message,
  });
});

app.listen(port, () => {
  console.log("Server is running from port", port);
});
