path = require("path");
url = require("url");
express = require("express");

app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/plotting.html"));
});

app.get("/*.html", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/" + url.parse(req.url, true).pathname));
});
app.get("/*.css", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/" + url.parse(req.url, true).pathname));
});
app.get("/*.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/client/" + url.parse(req.url, true).pathname));
});

app.listen(8080);
