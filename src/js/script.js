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

const errors = {
  fullName: "Error: Your full name is required.",
  email: {
    invalid: "Error: Please enter a valid email address.",
    required: "Error: An email address is required.",
  },
  message: "Error: A message is required.",
};

const errorBorderStyle = "solid 1px var(--red)";

formInputs.forEach((field) => {
  const [input, error] = field;

  if (
    input instanceof HTMLInputElement ||
    input instanceof HTMLTextAreaElement
  ) {
    input.addEventListener("blur", () => {
      // if required field left blank
      if (input.value.trim() === "") {
        input.style.border = errorBorderStyle;
        input.type === "text"
          ? (error.innerText = errors.fullName)
          : input.type === "email"
          ? (error.innerText = errors.email.required)
          : input.type === "textarea"
          ? (error.innerText = errors.message)
          : (error.innerText = "Error: This field is required.");
      } else if (
        // if invalid email
        input.type === "email" &&
        input.validity.typeMismatch
      ) {
        input.style.border = errorBorderStyle;
        error.innerText = errors.email.invalid;
      } else {
        // input is valid
        input.style.border = "revert";
        error.innerText = "";
      }
    });
  }
});

function checkFormValidity() {
  // map to boolean representing whether input is valid
  // render error message if not
  const validFields = formInputs.map((field) => {
    const [input, error] = field;
    if (input.value.trim() === "") {
      input.style.border = errorBorderStyle;
      input.setAttribute("aria-invalid", "true");
      input.type === "text"
        ? (error.innerText = errors.fullName)
        : input.type === "email"
        ? (error.innerText = errors.email.required)
        : input.type === "textarea"
        ? (error.innerText = errors.message)
        : (error.innerText = "Error: This field is required.");
      return false;
    } else if (input.type === "email" && input.validity.typeMismatch) {
      input.style.border = errorBorderStyle;
      input.setAttribute("aria-invalid", "true");
      error.innerText = errors.email.invalid;
      return false;
    } else {
      input.setAttribute("aria-invalid", "false");
      return true;
    }
  });

  // check whether all inputs are valid
  if (validFields.every((val) => val === true)) {
    return true;
  } else {
    return false;
  }
}

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = checkFormValidity();
    if (isValid) {
      formInputs.forEach((field) => {
        const [input, error] = field;
        input.disabled = true;
        error.innerText = "";
      });
      successMessage.style.display = "block";
      submitBtn.disabled = true;
    }
  });
}
