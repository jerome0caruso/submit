//INPUT FIELDS
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    //iterates through the *(input) fields used for params and args and the pw2 inputField
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} Is required`);
    } else {
      showSuccess(input);
    }
  });
}
function getFieldName(inputField) {
  //grabs one of the fields #id and changes first letter to Cap's
  return inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1); //gets called with checkRequired()
}
function showError(inputField, message) {
  const formControl = inputField.parentElement; //grabs class '.form-control'
  formControl.className = "form-control error"; //adds 'error' class for border color
  const small = formControl.querySelector("small"); //which makes the <small> element visiable (done in css)
  small.innerText = message; //inserts message( from arg) which is passed -
  // -in through checkRequired()
  // which is "filtered" by the getFieldName().
}
function showSuccess(inputField) {
  const formControl = inputField.parentElement; //grabs class '.form-control'
  formControl.className = "form-control success"; //adds 'success' class for border color
}
function checkLength(input, min, max) {
  //checks input, min and max from arguments in eventlistener
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
      showError(input,`${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}
function checkEmail(email) {
  //using regex to vaildate email
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, `${getFieldName(email)} is not valid`);
  }
}
function checkPasswords(pw1, pw2) {
  //checking to see if pw match
  if (pw1.value !== pw2.value) {
    showError(pw2, "Passwords do not match!");
  }
}
function checkUpperPw(pw) { // Checks for at least 1 uppercase in pw
    const cap = /(.*[A-Z].*)/g;
  if (cap.test(pw.value)) {
    showSuccess(pw);
  } else {
    showError(pw, `${getFieldName(pw)} needs one Uppercase letter`);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]); //All of the inputs from field
  checkLength(username, 3, 15); //arguments for min and max
  checkLength(password, 6, 25); //arguments for min and max
  checkEmail(email);
  checkPasswords(password, password2);
  checkUpperPw(password);
});
