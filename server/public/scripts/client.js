console.log('yo yo yo');
$( document ).ready( handleReady );

function handleReady() {
    console.log('jquery has joined the party');
    //click listeners will go here
    $('#addBtn').on('click', handleAddTask);
    $('#taskList').on('click', '.deleteBtn', deleteTask);
    $('#taskList').on('click', '.complete', completeTask);
}

function completeTask() {
    console.log('complete clicked');
    
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

//delete task
function deleteTask(){
    console.log('delete clicked');
    let task = $(this).closest('tr').data('task');
    //console.log(task.id);
    let idToDelete = task.id;
    //let idToDelete = 32;
    console.log($(this).closest('tr').data('task'))
    
    
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`,
    }).then(function(response){
        console.log(response);
        refreshTasks();
    }).catch(function(error){

    })
    
}

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

//display array of tasks on DOM
function  appendList(tasks) {
    $('#taskList').empty();
    
    for(let i = 0; i < tasks.length; i+= 1){
        let task = tasks[i];
        //console.log('this', + task.id);
        let $tr = $('<tr></tr>');
        $tr.data('task', task);
        console.log('task', task);
        console.log(task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td><button class="deleteBtn">DELETE</button></td>`);
        $tr.append(`<td><button class="complete">COMPLETE</button></td>`);
        $('#taskList').append($tr);
    }

}