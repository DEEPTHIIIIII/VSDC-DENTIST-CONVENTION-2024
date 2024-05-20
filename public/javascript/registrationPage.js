function toggleBanquetField() {
    var facultyType = document.getElementById("facultyType").value;
    var banquetField = document.getElementById("banquetField");
    if (facultyType === "non-ida") {
      banquetField.style.display = "block";
    } else {
      banquetField.style.display = "none";
    }
  }
  function togglePosterField() {
              var studentType = document.getElementById("studentType").value;
              var posterField = document.getElementById("posterField");
              if (studentType === "poster") {
                posterField.style.display = "block";
              } else {
                posterField.style.display = "none";
              }
}			

function sendmail(){
    Email.send({}).then(
message => alert("Thanks for filling out our form!")
);
    }

document.addEventListener('DOMContentLoaded', function() {
    const studentform = document.getElementById('registerform') ;
    //const facultyform = document.getElementById('registerform')
    const phoneInput = document.getElementById('phone');

    studentform.addEventListener('submit', function(event) {
        if (!validatePhone()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
    // facultyform.addEventListener('submit', function(event) {
    //     if (!validatePhone()) {
    //         event.preventDefault(); // Prevent form submission if validation fails
    //     }
    // });

    phoneInput.addEventListener('input', function() {
        phoneInput.setCustomValidity(''); // Clear previous custom validity message
    });
});


function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^[5-9][0-9]{9}$/; // Example pattern: 10 digits, starts from 5-9 only
    if (!phonePattern.test(phoneInput.value)) {
        phoneInput.setCustomValidity('Please enter a valid 10-digit phone number.');
        phoneInput.reportValidity(); // Show the custom validity message
        return false;
    }
    return true;
}