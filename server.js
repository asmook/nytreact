const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

var databaseUri = "mongodb://localhost/nytreact";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
};

var dbm = mongoose.connection;

dbm.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

dbm.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(routes);

// app.get("/api/saved", function(req,res){
//   db.Article.find({}).then(result => res.json(result))
// })

// app.post("/api/saved", function(req,res){
//   db.Article.create(req.body).then(result => res.json(result))
// })

// app.delete("/api/saved/:id", function(req,res){
//   db.Article.findOneAndRemove({_id: req.params.id}).then(result => res.json(result))
// })

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
