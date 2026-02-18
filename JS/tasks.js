// An array of "role|name" strings for binary-search lookup of a consultant by role.
/**
 * List of consultants with their roles.
 * Each entry is formatted as "Role|Name".
 * @type {string[]}
 */
var consultantsRoleName = [
    "Accounts Clerk (Payable)|Alice Johnson",
    "Accounts Clerk (Receivable)|Bob Johnson",
    "Accounts Manager|Carla Johnson",
    "Accounts Officer|David Johnson",
    "Accounts Team Leader|Emma Johnson",
    "Administration Assistant|Frank Johnson",
    "Administration Manager|Grace Johnson",
    "Administration Supervisor|Hank Johnson",
    "Brand Coordinator|Ivy Johnson",
    "Brand Manager|Jack Johnson",
    "Business Development Manager|Kelly Johnson",
    "Call Centre Manager|Liam Johnson",
    "Call Centre Operator|Mia Johnson",
    "Chief Data Officer|Noah Johnson",
    "Chief Executive Officer|Olivia Johnson",
    "Chief Technical Officer|Paul Johnson",
    "Chief of Operations|Quinn Johnson",
    "Client Partnerships Lead|Rachel Johnson",
    "Complaint Resolution Team Leader|Sam Johnson",
    "Corporate Social Responsibility Manager|Tina Johnson",
    "Customer Accounts Manager|Uma Johnson",
    "Customer Experience Administrator|Vince Johnson",
    "Customer Experience Data Manager|Wendy Johnson",
    "Customer Experience Manager|Xavier Johnson",
    "Customer Insight Coordinator|Yara Johnson",
    "Customer Service Officer|Zane Johnson",
    "Cyber Security Engineer|Abby Jones",
    "Database Development Team Leader|Ben Jones",
    "Digital Media Coordinator|Clara Jones",
    "Employee Relations Advisor|Derek Jones",
    "Employee Relations Officer|Ella Jones",
    "Employee Relations Team Lead|Felix Jones",
    "Employee Services Manager|Gina Jones",
    "Employee Social Planner|Harry Jones",
    "Engineering Consultant|Iris Jones",
    "Financial Controller|Jake Jones",
    "Finance Officer|Kara Jones",
    "Financial Planner|Leo Jones",
    "Head of Customer Service|Maya Jones",
    "Head of Finance|Nate Jones",
    "Head of Marketing|Opal Jones",
    "Human Resources Advisor|Pete Jones",
    "Human Resources Analyst|Quinn Jones",
    "Human Resources Consultant|Ruby Jones",
    "Human Resources Coordinator|Sean Jones",
    "Human Resources Director|Tara Jones",
    "Human Resources Information Systems Administrator|Ulysses Jones",
    "Internal Audit Officer|Violet Jones",
    "Internal Relations Team Lead|Will Jones",
    "ICT Consultant|Xena Jones",
    "ICT Services Senior Manager|Yuri Jones",
    "ICT Support Senior Manager|Zoe Jones",
    "ICT Network Senior Manager|Anna Brown",
    "ICT Security Senior Manager|Bill Brown",
    "Marketing and Communications Manager|Cara Brown",
    "Marketing and Research Analyst|Dean Brown",
    "Marketing and Research Coordinator|Eva Brown",
    "Marketing Assistant|Finn Brown",
    "Marketing Consultant|Gwen Brown",
    "Marketing Coordinator|Hank Brown",
    "Marketing Manager|Ivy Brown",
    "Media Coordinator|Jake Brown",
    "Media Planning Coordinator|Kara Brown",
    "Organisational Development Coordinator|Liam Brown",
    "Payroll Manager|Mia Brown",
    "Payroll Officer|Noah Brown",
    "Portfolio Team Leader|Olivia Brown",
    "Procurement Manager|Paul Brown",
    "Procurement Officer|Quinn Brown",
    "Product Development Coordinator|Rachel Brown",
    "Public Relations Lead|Sam Brown",
    "Quality Assurance Officer|Tina Brown",
    "Reception Manager|Uma Brown",
    "Receptionist|Vince Brown",
    "Recruitment Advisor|Wendy Brown",
    "Recruitment Coordinator|Xavier Brown",
    "Recruitment, Selection and Onboarding Administrator|Yara Brown",
    "Research Officer|Zane Brown",
    "Return To Work Coordinator|Abby Smith",
    "Salary Administrator|Ben Smith",
    "Service Desk Officer Level 1|Clara Smith",
    "Social Media Lead|Derek Smith",
    "Strategic Analyst|Ella Smith",
    "Strategic Planning Manager|Felix Smith",
    "Software Development Team Leader|Gina Smith",
    "Security Administrator|Harry Smith",
    "Security Manager|Iris Smith",
    "Sustainability Officer|Jake Smith",
    "Talent Acquisition Manager|Kara Smith",
    "Telecommunication Technician|Leo Smith",
    "Telecommunications Senior Manager|Maya Smith",
    "Technical Support Officer Level 2|Nate Smith",
    "Technical Support Specialist Level 3|Opal Smith",
    "Taxation Manager|Pete Smith",
    "Taxation Officer|Quinn Smith",
    "Training Advisor|Ruby Smith",
    "Training and Development Administrator|Sean Smith",
    "Training and Development Manager|Tara Smith",
    "Web Development Team Leader|Ulysses Smith",
    "Work Health and Safety Administrator|Violet Smith",
    "Work Health and Safety Coordinator|Will Smith",
    "Work Health and Safety Manager|Xena Smith",
    "Work Health and Safety Officer|Yuri Smith"
];

/**
 * Array of task objects created by the user.
 * Each task contains name, due date, priority, consultant, and completion status.
 * @type {Array<{taskName:string, dueDate:string, priority:string, consultant:string, completed:boolean}>}
 */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// let tasks = [];

/**
 * Form element used to add new tasks.
 * @type {HTMLFormElement}
 */
const taskForm = document.querySelector('#add-task-form');

/**
 * Input field for entering the task name.
 * @type {HTMLInputElement}
 */
const taskNameInput = document.querySelector('#task-name');

/**
 * Input field for entering the task due date.
 * @type {HTMLInputElement}
 */
const dueDateInput = document.querySelector('#due-date');

/**
 * Input field for selecting the task priority level.
 * @type {HTMLSelectElement}
 */
const priorityInput = document.querySelector('#priority-level');

/**
 * Dropdown list of consultants populated from `arr`.
 * @type {HTMLSelectElement}
 */
const consultantSelect = document.querySelector('#consultant');

/**
 * Input field for searching consultants by role or name.
 * @type {HTMLInputElement}
 */
const consultantSearch = document.querySelector('#consultant-search');

/**yhjh
 * Button used to add a new task.
 * @type {HTMLButtonElement}
 */
const addButton = document.querySelector('#btn-add-task');

/**
 * Button used to display all tasks in the table.
 * @type {HTMLButtonElement}
 */
const displayButton = document.querySelector('#display-all-tasks');

/**
 * Table body element where tasks are rendered.
 * @type {HTMLTableSectionElement}
 */
const tasksTbody = document.querySelector('#tasks-tbody');

/**
 * Form element used to search tasks by name.
 * @type {HTMLFormElement}
 */
const searchForm = document.querySelector('#search-task');

/**
 * Input field for entering the task name to search.
 * @type {HTMLInputElement}
 */
const searchInput = document.querySelector('#search-name');

/**
 * Button used to clear all tasks from the table display.
 * @type {HTMLButtonElement}
 */
const clearTaskTable = document.querySelector('#clear-tasks-list')

//Checks the taskForm and addButton exist before adding event listener
if (taskForm && addButton) {
    taskForm.addEventListener("submit", addTaskButtonClick);
}

//Checks the displayButton exist before adding event listener
if (displayButton) {
    displayButton.addEventListener("click", displayButtonClick)
}

//Checks the searchForm exist before adding event listener
if (searchForm) {
    searchForm.addEventListener("submit", searchTaskByName);
}

//Checks the clearTaskTable button exist before adding event listener
if (clearTaskTable) {
    clearTaskTable.addEventListener("click", clearTaskTableClick)
}


/**
 * Handles the "Add Task" form submission.
 * Creates a new task object and adds it to the `tasks` array.
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
function addTaskButtonClick(event) { //Function to handle add task button click event
    event.preventDefault(); //Prevents the default form submission behavior

    let taskName = taskNameInput.value; //Stores the value of task name input
    let dueDate = dueDateInput.value; //Stores the value of due date input
    let priority = priorityInput.value; //Stores the value of priority input
    let consultant = consultantSelect.value; //Stores the value of consultant input

    tasks.push({taskName,dueDate,priority,consultant,completed: false}); //Creates a new task record and adds it to the tasks array

    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated array to localStorage

    console.log("Saving to localStorage now..."); //Prints an indicator in the browser's console

    console.log(tasks); //This logs the tasks array to the console for debugging purposes
    taskForm.reset();   //Resets the form inputs after clicking the add task button
}

/**
 * Performs a binary search on the consultantsRoleName array to find matches for the given query.
 * @param {string} searchQuery - The search query.
 * @returns {Array<string>} 
 */
function binarySearchConsultant(searchQuery) { //Function to perform binary search on consultantsRoleName array

    let top = 0; // Initialize the top index of the consultantsRoleName array
    let bottom = consultantsRoleName.length - 1; // Initialize the bottom index of the consultantsRoleName array
    let results = []; // Array to store matching search consultant results

    while (top <= bottom) { //Continues searching while the top index is less than or equal to the bottom index

        let middle = Math.floor((top + bottom) / 2); //Calculate the middle index of the current search range
        let [role, name] = consultantsRoleName[middle].split("|"); //Split the middle entry into role and name as shown in the array
        let fullText = `${role} — ${name}`.toLowerCase(); //Combine role and name into a single string for comparison, converting to lowercase for case-insensitive search

        if (fullText.includes(searchQuery)) { //Checking whether a match is found at the middle index

            results.push(consultantsRoleName[middle]); //If a match is found, add it to the results array
            
            let topIndex = middle - 1; //Search upwards from the middle index for additional matches

            while (topIndex >= 0) { //Continue searching upwards while the index is valid

                let [role, name] = consultantsRoleName[topIndex].split("|"); //Split the current entry into role and name
                if (`${role} — ${name}`.toLowerCase().includes(searchQuery)) { //Checking whether the current entry matches the search query

                    results.unshift(consultantsRoleName[topIndex]); //When a match is found, add it to the beginning of the results array

                    topIndex--; //Move to the next consultant upwards in the array
                } 
                else {
                    break; //If no match is found, exit the upward search loop
                }
            }
            
            let bottomIndex = middle + 1; //Search downwards from the middle index for additional matches

            while (bottomIndex < consultantsRoleName.length) { //Continue searching downwards while the index is valid

                let [role, name] = consultantsRoleName[bottomIndex].split("|"); //Split the current entry into role and name as shown in the array
                if (`${role} — ${name}`.toLowerCase().includes(searchQuery)) { //Checking whether the current entry matches the search query

                    results.push(consultantsRoleName[bottomIndex]); //When a match is found, add it to the end of the results array

                    bottomIndex++; //Move to the next consultant downwards in the array

                } 
                else {
                    break; //If no match is found, exit the downward search loop
                }
            }
            break; //Exit the main search loop after finding all matches
        }

        if (fullText < searchQuery) { //If the middle entry is less than the search query, adjust the top index to search the upper half
            top = middle + 1; //Move the top index to just above the middle index
        } 
        else {
            bottom = middle - 1; //Move the bottom index to just below the middle index
        }
    }
    return results; //Return the array of matching consultant role-name strings
}

/**
 * Populates the consultant dropdown with options from `consultantsRoleName`.
 * Each option shows "Role — Name".
 * @returns {void}
 */
function addingConsultants() { //Function to add consultants to the dropdown list
    
    consultantSelect.innerHTML = ""; //Clear existing options in the dropdown

    consultantsRoleName.forEach(item => { //Iterate over each entry in the consultantsRoleName array

        let [role, name] = item.split("|"); //Split the current entry into role and name
        let option = document.createElement("option"); //Create a new option element for the dropdown

        option.value = name; //Set the option value to the consultant's name
        option.textContent = `${role} — ${name}`; //Set the option text to display "Role — Name"

        consultantSelect.appendChild(option); //Add the option to the consultant dropdown
    });
}
addingConsultants(); //Call the function to populate the consultant dropdown on page load

consultantSearch.addEventListener("input", () => { //Add an input event listener to the consultant search field
    let query = consultantSearch.value.toLowerCase().trim(); //Get the current search query, converting to lowercase and trimming whitespace
    
    if (query === "") { //If the search query is empty, show all consultants

        Array.from(consultantSelect.options).forEach(option => { //Iterate over each option in the consultant dropdown

            option.style.display = ""; //Reset the display style to show all options
            
        }); 
        return; //Exit the function early if the search query is empty
    }

    let matches = binarySearchConsultant(query); //Perform a binary search to find matching consultants for the search query
    
    Array.from(consultantSelect.options).forEach(option => { //Iterate over each option in the consultant dropdown

        let isMatch = matches.some(item => { //Check if the current option matches any of the search results

            let [role, name] = item.split("|"); //Split the matching entry into role and name

            return option.textContent === `${role} — ${name}`; //Return true if the option text matches the "Role — Name" format

        });
        option.style.display = isMatch ? "" : "none"; //Show the option if it matches, otherwise hide it
    });
});


/**
 * Handles searching tasks by name through a sequential search.
 * Filters tasks and renders matches in the table.
 * @param {Event} event - The form submission event.
 * @returns {void}
 */

function searchTaskByName(event) { //Handles searching tasks by name through a sequential search
    event.preventDefault(); //Prevents the default form submission behavior

    let query = searchInput.value.toLowerCase(); //Get the search query, converting to lowercase for case-insensitive comparison
    let filteredTasks = []; //Array to store tasks that match the search query

    for (let i = 0; i < tasks.length; i++) { //Iterate over each task in the tasks array
        
        if (tasks[i].taskName.toLowerCase() === query) { //Check if the task name matches the search query
           
            filteredTasks.push(tasks[i]); //If a match is found, add the task to the filteredTasks array
        }
    }

    if (filteredTasks.length === 0) { //Check if no tasks matched the search query
        tasksTbody.innerHTML = `<tr><td colspan="5">Task not found</td></tr>`; //Display a message indicating no tasks were found
    } 
    else {
        renderTasks(filteredTasks); //Render the filtered tasks in the table
    }
    console.log("Search button clicked"); //Log a message indicating the search button was clicked
}

/**
 * Displays all tasks in the table.
 * @returns {void}
 */
function displayButtonClick() { //Function to handle the display button click event
    renderTasks(tasks); //Render all tasks in the table
    console.log("Display button clicked"); //Log a message indicating the display button was clicked
}

/**
 * Clears all tasks from the table display.
 * @returns {void}
 */
function clearTaskTableClick() { //Function to handle the clear task table button click event
    tasksTbody.innerHTML = ""; //Clear all tasks from the table display
}

/**
 * Renders a list of tasks into the table body.
 * @param {Array<{taskName:string, dueDate:string, priority:string, consultant:string, completed:boolean}>} taskArray - Array of tasks to render.
 * @returns {void}
 */
function renderTasks(taskArray) { //Function to render a list of tasks into the table body
    tasksTbody.innerHTML = ""; //Clear existing rows in the table body

    if (tasks.length === 0) { //Checks whether the tasks array is empty
        alert("No tasks found."); //Displays a message for no tasks found when clicking "Display All Tasks" button
    }

    taskArray.forEach((task, index) => { //Iterate over each task in the provided task array
        let row = document.createElement("tr"); //Create a new table row element

        if (task.completed) { //Check if the task is marked as completed
            row.classList.add("completed-task"); //Add a CSS class to style completed tasks
        }
        //Populate the row with task details and action buttons
                row.innerHTML = ` 
            <td>${task.taskName}</td>
            <td>${task.dueDate}</td>
            <td>${task.priority}</td>
            <td>${task.consultant}</td>
            <td>
                <div class="task-actions">
                    <input type="checkbox" ${task.completed ? "checked" : ""} 
                        onchange="toggleTaskCompletion(${index})">
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            </td>
        `;

        tasksTbody.appendChild(row);  //Add the populated row to the table body
    });
}

/**
 * Toggles the completion status of a task.
 * @param {number} index - Index of the task in the `tasks` array.
 * @returns {void}
 */
function toggleTaskCompletion(index) { //Function to toggle the completion status of a task
    tasks[index].completed = !tasks[index].completed; //Toggle the completed status of the task at the specified index
    localStorage.setItem("tasks", JSON.stringify(tasks)); //Saves the modified tasks array into local storage
    displayButtonClick(); //Refresh the task display to reflect the updated status
    console.log("Marked completed check box clicked") //Log a message indicating the task completion status was toggled
}

/**
 * Deletes a task from the `tasks` array.
 * @param {number} index - Index of the task to delete.
 * @returns {void}
 */
function deleteTask(index) { //Function to delete a task from the tasks array
    tasks.splice(index, 1); //Remove the task at the specified index from the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks)); //Saves the modified tasks array into local storage
    displayButtonClick(); //Refresh the task display to reflect the deletion
    console.log("task deleted"); //Log a message indicating a task was deleted

}