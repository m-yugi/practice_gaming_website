let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
let app = express();
// const { request } = require("http");
let port = 8080;
// let bodyparser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/gamecontact");
var gameschema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
});
let finalschema = new mongoose.model("gamedata", gameschema);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("images"));
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.status(200).render("dance");
});
app.get("/contact", (req, res) => {
  res.status(200).render("conact_form");
});
app.post("/contact", (req, res) => {
  // let name = req.body.name;
  // console.log(name);
  let mydata = new finalschema(req.body);
  mydata
    .save()
    .then(() => {
      res.send("your data had been saved successfully");
    })
    .catch(() => {
      res.status(404).send("data not saved there is an error");
    });
  // res.status(200).render("conact_form");
  // res.send("data is taken in");
});
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
