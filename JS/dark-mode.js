/**
 * Button element used to toggle dark mode on and off.
 * @type {HTMLButtonElement}
 */
const darkModeToggle = document.querySelector("#dark-toggle");

/**
 * Handles the dark mode toggle click event.
 *
 * Toggles the `dark-theme` class on the document body.
 * Persists the user's preference in `localStorage` under the key `"dark-theme-mode"`.
 *
 * - If dark mode is active, it removes the class and stores `false`.
 * - If dark mode is inactive, it adds the class and stores `true`.
 *
 * @event click
 * @returns {void}
 */


// Load saved theme on startup
const savedTheme = localStorage.getItem("dark-theme-mode"); //variable for saving user's theme preferences to local storage
if (savedTheme === "true") {
    document.body.classList.add("dark-theme"); //Add dark mode class to body
}

darkModeToggle.addEventListener("click", () => { //Event listener for dark mode toggle button
    if (document.body.classList.contains("dark-theme")) {  //Check if dark mode is currently active
        document.body.classList.remove("dark-theme"); //Remove dark mode class from body
        localStorage.setItem("dark-theme-mode", "false"); //Store preference in localStorage
    } else {
        document.body.classList.add("dark-theme"); //Add dark mode class to body
        localStorage.setItem("dark-theme-mode", "true"); //Store preference in localStorage
    }
});