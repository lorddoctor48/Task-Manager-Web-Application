/**
 * Input field for the user's name.
 * @type {HTMLInputElement}
 */
const nameInput = document.querySelector("#name");

/**
 * Input field for the user's email address.
 * @type {HTMLInputElement}
 */
const emailInput = document.querySelector("#email");

/**
 * Input field for the user's message.
 * @type {HTMLTextAreaElement}
 */
const messageInput = document.querySelector("#message");

/**
 * Button element used to submit the contact form.
 * @type {HTMLButtonElement}
 */
const sendButton = document.querySelector("#submit-contact");

/**
 * The contact form element containing name, email, and message inputs.
 * @type {HTMLFormElement}
 */
const contactForm = document.querySelector("#contact-form");

if (sendButton) {
    contactForm.addEventListener("submit", sendButtonClick);
}

/**
 * Handles the contact form submission event.
 *
 * Prevents the default form submission, retrieves input values,
 * shows a confirmation alert, and clears the form fields.
 *
 * @param {Event} event - The form submission event object.
 * @returns {void}
 */
function sendButtonClick(event) { //Function to handle contact form submission
    event.preventDefault(); //Prevent default form submission behavior

    const name = nameInput.value; //Stores the value of the name input field
    const email = emailInput.value; //Stores the value of the email input field
    const message = messageInput.value; //Stores the value of the message input field

    const confirmation = `Thank you ${name}! Your message has been sent`; //Create a personalised confirmation message

    alert(confirmation); //Display the confirmation message as an alert

    // Reset form fields
    nameInput.value = ""; //Clear the name input field
    emailInput.value = ""; //Clear the email input field
    messageInput.value = ""; //Clear the message input field
}