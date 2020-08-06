//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task listener
    form.addEventListener('submit', addTask);

    //remove task listener
    taskList.addEventListener('click', removeTask);

    //clearbtn event listener
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//create addTask function
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }
    //create list items
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; // secondary-content will allow to add element in right in matialize UI
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in localstorage
    storeTaskInLocalStorage(taskInput.value);

    //clear input field
    taskInput.value='';

    e.preventDefault();
}

//remove task function
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        //e.tagert here returns <i> tag
        if(confirm('Are you sure, you want to delete item?')) {
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

//remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks function
function clearTasks(e) {
    //taskList.innerHTML=''; 

    // faster removing
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from local storage
    localStorage.clear();
}

//filter tasks function
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // typed value

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        //create list items
        const li = document.createElement('li');
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'; // secondary-content will allow to add element in right in matialize UI
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}