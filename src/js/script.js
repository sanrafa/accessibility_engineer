/* Close yellow banner */
const closeBtn = document.getElementById("close-banner");
const banner = document.getElementById("banner");

closeBtn.addEventListener("click", () => (banner.style.display = "none"));

/* Form control & validation */
const nameInput = document.getElementById("full-name");
const nameInputError = document.getElementById("full-name-error");
const emailInput = document.getElementById("email");
const emailInputError = document.getElementById("email-error");
const messageInput = document.getElementById("message");
const messageInputError = document.getElementById("message-error");
const submitBtn = document.getElementById("submit-btn");
const successMessage = document.getElementById("success");
const formInputs = [
  [nameInput, nameInputError],
  [emailInput, emailInputError],
  [messageInput, messageInputError],
];

const form = document.getElementById("form");

const requiredError = "Error: This field is required.";
const emailError = "Error: Please enter a valid email address.";

formInputs.forEach((input) => {
  if (
    input[0] instanceof HTMLInputElement ||
    input[0] instanceof HTMLTextAreaElement
  ) {
    input[0].addEventListener("change", () => {
      /* if required field left blank */
      if (input[0].validity.valueMissing) {
        input[0].style.border = "solid 1px var(--red)";
        input[1].innerText = requiredError;
      } else {
        input[0].style.border = "revert";
        input[1].innerText = "";
      }
      /* If invalid email */
      if (input[0].type === "email" && !input[0].validity.valueMissing) {
        if (input[0].validity.typeMismatch) {
          input[0].style.border = "solid 1px var(--red)";
          input[1].innerText = emailError;
        } else {
          input[0].style.border = "revert";
          input[1].innerText = "";
        }
      }
    });
  }
});

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = form.checkValidity();
    if (isValid) {
      formInputs.forEach((input) => {
        input[0].disabled = true;
        input[1].innerText = "";
      });
      successMessage.style.display = "block";
      submitBtn.disabled = true;
    }
  });
}
