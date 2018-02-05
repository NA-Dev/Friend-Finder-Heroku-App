// Routes
// =============================================================
var path = require("path");

module.exports = function(app) {
  app.get("/:word?", function(req, res) {
    var word = req.params.word;
    
    if (word === "survey") {
      res.sendFile(path.join(__dirname, "/../public/survey.html"));
    } 
    
    else {
      res.sendFile(path.join(__dirname, "/../public/home.html"));
    }
  });
}
