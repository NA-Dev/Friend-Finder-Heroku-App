// Routes
// =============================================================

app.get("/:path?", function(req, res) {
  var path = req.params.path;
  
  if (path === "survey") {
    res.sendFile(path.join(__dirname, "survey.html"));
  } 
  
  else {
    res.sendFile(path.join(__dirname, "home.html"));
  }
});