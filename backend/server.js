const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database conntected successfully..."))
  .catch((err) => console.log("Error connection to mongodb", err));

// const allowed = [
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "some other link",
// ];

// const options = {
//   origin: "http://localhost:3000",
//   useSuccessStatus: 200,
// };

//here res is the callback function
// const options = (req, res) => {
//   let tmp;
//   let origin = req.header("origin");
//   console.log("origin = " + req.header("Origin"));
//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: "Stupid",
//     };
//   }
//   res(null, tmp);
// };
// app.use(cors(options));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
