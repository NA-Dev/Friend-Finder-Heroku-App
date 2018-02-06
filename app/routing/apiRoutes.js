// Routes
// =============================================================

module.exports = function(app) {
  var people = require("../data/people");

  app.get("/api/people", function(req, res) {
      res.json(people);
  });
  
  app.post("/api/people", function(req, res) {
    var newPerson = req.body;
    var gender = Number(newPerson.scores[0]);
    var genderPref = Number(newPerson.scores[1]);
    var candidates = [];
    var match = {};
    
    if (genderPref === 1 || genderPref === 2) {
      candidates = people.filter(function(person) {
        return Number(person.scores[0]) === genderPref;
      });

    } else {
      candidates = people;
    };
  
    if (candidates.length === 0) {
      match = false;
    };

    
    var bestMatchScore = 50;
  
    // for each friend, for each metric, record difference from user's answers
    for (let i=0; i < candidates.length; i++) {
      var candidateGenderPref = Number(candidates[i].scores[1]);
      var compareScore = 0;
  
      for (let j=2; j < newPerson.scores.length; j++) {
        compareScore += Math.abs(
          Number(newPerson.scores[j]) - Number(candidates[i].scores[j])
        );
      };

      // if there are ties for best match, it just picks the first best match
      if (compareScore < bestMatchScore && 
        (candidateGenderPref === 3 ||
        candidateGenderPref === gender)) {

        bestMatchScore = compareScore;
        match = candidates[i];
      };
    };

    people.push(newPerson);

    if (match) {
      res.json(match);
      
    } else {
      res.json(false);
    };
  });
};