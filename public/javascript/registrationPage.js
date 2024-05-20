// function toggleBanquetField() {
//     var facultyType = document.getElementById("facultyType").value;
//     var banquetField = document.getElementById("banquetField");
//     if (facultyType === "non-ida") {
//       banquetField.style.display = "block";
//     } else {
//       banquetField.style.display = "none";
//     }
//   }
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



function storePart1Data(){

    const form = document.getElementById('registerform');
    validatePhone();
    if(form.checkValidity() ) {
        const facultyType = document.getElementById('facultyType').value;
    const banquet = document.getElementById('banquet').value;
    const name = document.getElementById('yourname').value;
    const speciality = document.getElementById('speciality').value;
    const email = document.getElementById('emailaddress').value;
    const phone = document.getElementById('phone').value;
    const ksdc = document.getElementById('ksdc').value;

    //Store in Session Storage

    sessionStorage.setItem('facultyType', facultyType);
    sessionStorage.setItem('banquet', banquet);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('speciality', speciality);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('ksdc', ksdc);

    //Redirect to paymnet page

    window.location.href = '/facultyregisterpay';
    }
    else {
        form.reportValidity();
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    // If on Page 2, populate form fields with data from session storage
    if (window.location.pathname.endsWith('facultyregisterpay')) {
        //console.log('hello');
        const form = document.getElementById('registerform');
        const facultyType = sessionStorage.getItem('facultyType');
        const banquet = sessionStorage.getItem('banquet');
        const name = sessionStorage.getItem('name');
        const speciality = sessionStorage.getItem('speciality');
        const email = sessionStorage.getItem('email');
        const phone = sessionStorage.getItem('phone');
        const ksdc = sessionStorage.getItem('ksdc');
        console.log(facultyType, name, speciality, email);

        if (facultyType && banquet && name && speciality && email && phone && ksdc) {

            console.log(facultyType, name, speciality, email);
            // Optionally, you could add hidden fields to submit these values along with the second part of the form
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="facultyType" value="${facultyType}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="banquet" value="${banquet}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="yourname" value="${name}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="speciality" value="${speciality}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="emailaddress" value="${email}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="phone" value="${phone}">`);
            form.insertAdjacentHTML('beforeend', `<input type="hidden" name="ksdc" value="${ksdc}">`);
        }

        console.log(document.getElementsByName('facultyType')[0].value);

        // form.addEventListener('submit', function(event) {
        //     // Combine all the form data and submit it here if needed
        //     // For example, you could use the fetch API to send the data to the server via AJAX
        // });
    }
});