// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('btn-add');

const taskTitle = $('#task-title');
const datePicker = $('#date-picker');
const taskDescription = $('#task-description');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId == null) {
        nextId = 1;
    } else {
        nextId++;
    }

    localStorage.setItem('nextId', JSON.stringify(nextId));
};

// Todo: create a function to create a task card
function createTaskCard(task) {


    const divEl = $('div');
    const taskTitleEl = $('p');
    const datePickerEl = $('p');
    const taskDescriptionEl = $('p');
    const taskProgressEl = $('p');

    divEl.attr('class', 'task-card');
    divEl.attr('class', 'draggable');

    taskTitleEl.text(`Title: ${task.taskTitle}`);
    datePickerEl.text(`Due Date: ${task.datePicker}`);
    taskDescriptionEl.text(`Task Description: ${task.taskDescription}`);
    taskProgressEl.text(`Progress: ${task.taskProgress}`);

    divEl.append(taskTitleEl);
    divEl.append(datePickerEl);
    divEl.append(taskDescriptionEl);
    divEl.append(taskProgressEl);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (!taskList) {
        taskList = []
    }
    const main = $('main');
    const todoCardsEl = $('#todo-cards');
    const inProgressEl = $('#in-progress-cards');
    const doneCardsEl = $('#done-cards');

    taskList.forEach(data => {
        if (taskPorgress === "todo") {
            todoCardsEl.append(createTaskCard(data))
        } else if (taskProgress === 'done') {
            doneCardsEl.append(createTaskCard(data))
        } else if (taskprogress === 'In progress') {
            inProgressEl.append(createTaskCard(data))
        }

    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

    let taskListContent = {
        id: generateTaskId(),
        taskTitle: taskTitle.value.trim(),
        datePicker: datePicker.value.trim(),
        taskDescription: taskDescription.value.trim(),
        taskProgress: 'todo',
    };

    taskList.push(taskListContent);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $( function() {
        $( "#sortable" ).sortable();
      } );

      $( function() {
        $( "#draggable" ).draggable();
        $( "#droppable" ).droppable({
          drop: function( event, ui ) {
            $( this )
              .addClass( "ui-state-highlight" )
              .find( "p" )
                .html( "Dropped!" );
          }
        });
      } );
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    addTaskBtn.on('click', function () {
        generateTaskId()
        createTaskCard()
        renderTaskList()
    });
    handleDrop()
});
