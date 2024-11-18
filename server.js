const express = require("express")
const bodyParser = require("body-parser");
const mySqlPool = require("./config/db");
const router = require("./routes/usersRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/", router)

app.get("/", (req, res) => {
  res.send("server is working");
})


mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("mySql DB is connected.");
    app.listen(3000, () => {
      console.log("Server running at localhost:3000");
    })
  })
  .catch(err => console.log("Error while connecting - ", err.message))



