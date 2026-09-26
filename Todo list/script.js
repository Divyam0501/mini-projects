document.addEventListener("DOMContentLoaded", () => { //so that js loads after HTML, CSS is fully loaded
  //accessing all the button and tags which are in use
  const todoInput = document.getElementById("todo-input")
  const addTaskButton = document.getElementById("add-task-btn")
  const todoList = document.getElementById("todo-list")

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //Parse changes the string to original data type. And local storage & getItems stores the task data in local storage and takes it from getItem method

  tasks.forEach(task => renderTask(task)) //forEach loop renders all the tasks from array and takes inside a loop to read/display all the tasks

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim() // Remove extra spaces from the beginning and end of the input.
    if (taskText === "") return; //if empty input then don't add a task
    //else
    const newTask = {
      id: Date.now(), //It is used to uniquely identify each task
      text: taskText, //getting the input written by the user
      completed: false // Tracks whether the task is completed.

    }
    tasks.push(newTask) //adding input tasks to the array 
    saveTasks(); //saving the tasks
    renderTask(newTask); //rendering the tasks to avoid refreshing the page again and again 
    todoInput.value = ""; //clear input

  })

  function renderTask(task) { //creating a function to get and display the tasks from the array 
    const li = document.createElement("li") //creating the li tags to be presented to the user 
    li.setAttribute("data-id", task.id) // Store the task's ID as a custom data attribute.
    if (task.completed) li.classList.add("completed") //adds the completed class and its related CSS properties 
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button> 
    `; //inside the html li tag, what all should be present

    li.addEventListener("click", (e) => { //li should listen event e on clicking 
      if (e.target.tagName === "BUTTON") return; //checks if button is clicked inside the li tag by matching the tag name 
      //else
      task.completed = !task.completed //reverse the task complted true or false boolean
      li.classList.toggle("completed") //then toggling completed class on the li, if TRUE then FALSE and vice versa
      saveTasks() //saving the evry movement in the li to avoid refreshing 
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation() //prevent toggle from firing
      tasks = tasks.filter(t => t.id !== task.id) //checks for every iteration with the current iteration being clicked and keep the tasks which aren't equal to the current task t
      li.remove() //deletes the li
      saveTasks() //again saves the tasks array
    })

    todoList.appendChild(li);
  }

  function saveTasks() { //simple Function to save the tasks
    localStorage.setItem("tasks", JSON.stringify(tasks)) //changing the array to string coz that's the only way local storage can store items
  }
})