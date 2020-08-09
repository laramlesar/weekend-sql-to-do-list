console.log('yo yo yo');
$( document ).ready( handleReady );

function handleReady() {
    console.log('jquery has joined the party');
    //click listeners will go here
    $('#addBtn').on('click', handleAddTask);
    $('#deleteBtn').on('click', handleAddTask);
}

function handleAddTask(){
   console.log('add clicked');
   //let task = {};
   //task.task = $('#toDoList').val();
    
    //taskToAdd = input data
    let task = {}
    task.name = $('#toDoList').val();
    console.log('task =' + task.name);
    addTask(task);
    
}

/*function deleteTask(){
    console.log('delete clicked');
    let task = $(this).closest('tr').data('task');
    console.log(task.id);
    $.ajax({
        method: 'DELETE'
        url: `/tasks/${idToDelete}`,
    }).then(function(response){
        console.log(response);
        refreshTasks();
    }).catch(function(error){

    })
    
}
*/
//add a task to the database
function addTask(task) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: task,
    }).then(function(response){
        console.log('response from server', response);
        refreshTasks();
    }).catch(function(error){
        console.log('error in POST', error);
        alert('Unable to add tasks at this time, please take some mental health time')
    });
    
}

//refresh will get all tasks from server
function refreshTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        appendList(response);
    }).catch(function(error){
        console.log('error in refresh', error);
    });
}

//display tasks on DOM
function  renderTasks(tasks) {
    $('#taskList').empty();

    for(let i = 0; i < tasks.length; i+= 1){
        let tasks = tasks[i];
        let $tr = $('<tr></tr>');
        $tr.data('tasks', tasks);
        $tr.append(`<td>${tasks.tasks}</td>`);
        $tr.append(`<td><button class="deleteBtn">DELETE</button></td>`);
        $tr.append(`<td><button class="complete">COMPLETE</button></td>`);
        $('#taskList').append($tr);
    }
    
}