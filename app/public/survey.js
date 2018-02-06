// Format selector boxes with JQuery Chosen
$(".chosen-select").chosen({width: "95%"});

// Capture the form inputs
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Form and URL validation
  function formIsValid() {
    var photo = $("#photo")[0];
    var isValid = true;

    $(".form-control, .chosen-select").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });

    if (!photo.checkValidity()) {
      isValid = false;
    }

    return isValid;
  }

  // If all required fields are filled
  if (formIsValid()) {
    // Create an object for the user"s data
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("#gender").val(),
        $("#matchGender").val(),
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };

    // AJAX post the data to the friends API.
    $.post("/api/people", userData, function(data) {
      if (data) {
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);

      } else {
        $("#match-name").text("Sorry, no matches available");           
      }

      $("#results-modal").modal("toggle");
    });

  } else {
    alert("Please fill out all fields including a valid photo URL before submitting!");
  }
});  