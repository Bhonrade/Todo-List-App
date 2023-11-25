document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(function (task, index) {
        createTaskElement(task, index);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);

        createTaskElement({ text: taskText, completed: false }, tasks.length - 1);

        taskInput.value = '';
    }
}

function createTaskElement(task, index) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
        <span id="taskText-${index}" ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        <button class="save-btn" onclick="saveTask(${index})">Save</button>
    `;

    li.style.backgroundColor = task.completed ? '#cfc' : '#fff';

    li.addEventListener('click', function () {
        toggleTask(index);
    });

    taskList.appendChild(li);
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);

    loadTasks();
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);

    loadTasks();
}

function editTask(index) {
    const taskTextElement = document.getElementById(`taskText-${index}`);
    const editBtn = document.querySelector(`#taskList li:nth-child(${index + 1}) .edit-btn`);
    const saveBtn = document.querySelector(`#taskList li:nth-child(${index + 1}) .save-btn`);

    taskTextElement.contentEditable = true;
    taskTextElement.focus();
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline';
}

function saveTask(index) {
    const taskTextElement = document.getElementById(`taskText-${index}`);
    const editBtn = document.querySelector(`#taskList li:nth-child(${index + 1}) .edit-btn`);
    const saveBtn = document.querySelector(`#taskList li:nth-child(${index + 1}) .save-btn`);

    taskTextElement.contentEditable = false;
    editBtn.style.display = 'inline';
    saveBtn.style.display = 'none';

    const tasks = getTasks();
    tasks[index].text = taskTextElement.innerText.trim();
    saveTasks(tasks);

    loadTasks();
}
