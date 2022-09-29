const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
const connectDb = require("./config/db");
let userRouter = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewere");
require("dotenv").config();

dotenv.config();

connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  session({
    secret: "key",
    cookie: { maxAge: 60000000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());

app.use("/", userRouter);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT, console.log(`server started at PORT : ${PORT}`));
