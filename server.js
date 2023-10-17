const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require("cookie-parser");
const PORT = 8080;
require("dotenv").config();
require("./dbConn.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(`/`, require("./routes.js"));

require("mongoose")
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
