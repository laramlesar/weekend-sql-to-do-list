console.log('yo yo yo');
$( document ).ready( handleReady );

function handleReady() {
    console.log('jquery has joined the party');
    //click listeners will go here
    $('#addBtn').on('click', addTask);
}

function addTask(){
    console.log('add clicked');
}

/*function deleteTask(){
    console.log('delete clicked');
    let task = $(this).closest('div').data('task');
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