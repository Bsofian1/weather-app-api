require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = 3000;

const weather = require("./weather/index");

app.use(express.json());

const whiteist = ["http://127.0.0.1", "http://127.0.0.1:5500"];
const corsOption = {
  origin: (origin, callback) => {
    if (!origin || whiteist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

//Apply limits of 1 call per sec
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
// Apply to the app
app.use(limiter);

//test route
app.get("/", (req, res) => res.json({ succes: "hello World!" }));
app.use("/weather", weather);

app.listen(port, () => console.log(`App listening on port ${port}`));
