//Create event listeners for form
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('pin').addEventListener('blur', validatePincode);

//functions below
function validateName() {
    // get value of name field
    const name = document.getElementById('name');
    //create a variable for regular expressions
    const re = /^[A-Za-z]{3,15}$/; //start with any alphabet and length should be between 3 to 15

    if(!re.test(name.value)) {
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }
}

function validateEmail() {
    // get value of email field
    const email = document.getElementById('email');
    //create a variable for regular expressions
    const re = /^([A-Za-z0-9_\.]+)@([A-Za-z0-9]+)\.([a-zA-Z]{2,5})$/;
    /*
        Email can have characters, number, underscore or dot
        appended by @
        appended by website name (character or number)
        appended by dot
        appended by domain (character of length 2-5)
    */

    if(!re.test(email.value)) {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }
}

function validatePhone() {
    // get value of phone field
    const phone = document.getElementById('phone');
    //create a variable for regular expressions
    const re = /^[0-9]{10}$/; //numbers of length 10

    if(!re.test(phone.value)) {
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }
}

function validatePincode() {
    // get value of pin code field
    const pin = document.getElementById('pin');
    //create a variable for regular expressions
    const re = /^[0-9]{6}$/; // any numbers of length 6

    if(!re.test(pin.value)) {
        pin.classList.add('is-invalid');
    } else {
        pin.classList.remove('is-invalid');
    }
}