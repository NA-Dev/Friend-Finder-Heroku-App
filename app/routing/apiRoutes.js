var fs = require("fs");
var people = require("../data/people");

// Routes
// =============================================================

module.exports = function(app) {

  app.get("/api/people", function(req, res) {
    console.log("api/people get");
      res.json(people);
  });
  
  app.post("/api/people", function(req, res) {
    console.log("api/people post");
    var newPerson = req.body;
    var match = matchmaker(newPerson);
  
    if (match) {
      res.json(match);
    } else {
      res.json(false);
    }
  
    people.push(newPerson);
  
    // fs.write("/../data/people.js", people, function(err) {
    //   if (err) throw err;
    //   console.log('Person added');
    // });
  });
}

function matchmaker(newPerson) {
  console.log("matchmaker");
  var gender = newPerson.scores[0];
  var genderPref = newPerson.scores[1];
  var candidates = [];

  if (genderPref === 0 || genderPref === 1) {
    candidates = people.filter(function(person) {
      person.scores[0] === genderPref;
    });
  }
  
  else {
    candidates = people;
  }

  var match = {};

  if (candidates.length === 0) {
    return false;
  }

  // for each friend, for each metric, record difference from user's answers
  $("candidates").each(function(i, candidate) {
    var bestMatchScore = 50;
    var compareScore = 0;

    for (let i=2; i < newPerson.scores.length; i++) {
      comparescore += Math.abs(newPerson.scores[i] - candidate.scores[i]);
    }

    // this does not account for ties, just picks the first best match
    if (compareScore < bestMatchScore) {
      bestMatchScore = compareScore;
      match = candidate;
    }
  });

  return match;
}