// Routes
// =============================================================

module.exports = function(app) {
  var people = require("../data/people");

  app.get("/api/people", function(req, res) {
      res.json(people);
  });
  
  app.post("/api/people", function(req, res) {
    var newPerson = req.body;
    var gender = newPerson.scores[0];
    var genderPref = newPerson.scores[1];
    var candidates = [];
  
    if (genderPref === 0 || genderPref === 1) {
      candidates = people.filter(function(person) {
        person.scores[0] === genderPref;
      });

    } else {
      candidates = people;
    };
  
    var match = {};
  
    if (candidates.length === 0) {
      match = false;
    };
  
    // for each friend, for each metric, record difference from user's answers
    for (let i=0; i < candidates.length; i++) {
      var bestMatchScore = 50;
      var compareScore = 0;
  
      for (let j=2; j < newPerson.scores.length; j++) {
        compareScore += Math.abs(newPerson.scores[j] - candidates[i].scores[j]);
      };
  
      // if there are ties for best match, it just picks the first best match
      if (compareScore < bestMatchScore) {
        bestMatchScore = compareScore;
        match = candidates[i];
      };
    };

    // people.push(newPerson);

    if (match) {
      res.json(match);
      
    } else {
      res.json(false);
    };
  });
};