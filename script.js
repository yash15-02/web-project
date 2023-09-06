const enterbtn= document.querySelector(".enter-btn");
const input= document.getElementById("text-input");
const todolistbox= document.getElementById("todo-list");
const checkboxele= document.querySelector(".box");
var todos= [];

function enterPressed(event){
    if(event.keyCode=== 13){
        pushTodo();
    }
}

function pushTodo(){
    const currentDate = new Date();
    if(input.value.length!= 0){
        var todoitem= {
            task: input.value,
            uid:  input.value + "-" + currentDate.getTime(),
            formattedtime: currentDate,
            isCompleted: false
        }
        todos.push(todoitem);
        removeTodo();
    }
    else{
        alert("please enter a task");
    }
}

function removeTodo(){
    const itemBodies= document.getElementsByClassName("item-body");
    Array.from(itemBodies).forEach(itemBody => itemBody.remove());
    render();
}

function render(){
    todos = todos.sort((previousTodo, nextTodo) => {
        const booleanSorting = previousTodo.isCompleted - nextTodo.isCompleted;
        const timeSorting = nextTodo.formattedtime.getTime() - previousTodo.formattedtime.getTime();
        return booleanSorting || timeSorting
    })
    todos.forEach(todo => display(todo))
}   

function display(todo){
    var itemBodyDiv = document.createElement('div');
        itemBodyDiv.classList.add('item-body');
        itemBodyDiv.setAttribute("id", todo.uid);

    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = todo.isCompleted;
        checkbox.classList.add('cbox');
    
    var taskdatediv= document.createElement('div');
        taskdatediv.classList.add('ptag');

    var taskpara= document.createElement('p');
        taskpara.classList.add('todo');
        taskpara.textContent= todo.task;

    var date= document.createElement('p');
        date.classList.add('datetime');
        const time = todo.formattedtime.getHours() + ":" + todo.formattedtime.getMinutes() + ":" + todo.formattedtime.getSeconds()
        date.textContent= time;

    var deletebox= document.createElement('div');
        deletebox.classList.add('del-box');
        deletebox.textContent= "X";
        
    
    todolistbox.appendChild(itemBodyDiv); 
    itemBodyDiv.appendChild(checkbox);
    itemBodyDiv.appendChild(taskdatediv);
    taskdatediv.appendChild(taskpara);
    taskdatediv.appendChild(date);
    itemBodyDiv.appendChild(deletebox);

    input.value= "";
    checkbox.addEventListener('change',()=> toggle(event));
    deletebox.addEventListener('click',()=> deleteTask(event))
}

function toggle(event){
    const checkedEleId = event.target.parentElement.id;
    todos = todos.map(todo => {
        if(todo.uid === checkedEleId) {
            todo.isCompleted = !todo.isCompleted;
        }
        return todo;
    })
    removeTodo();
}

function deleteTask(event){
    const delEleId= event.target.parentElement.id;
    todos = todos.filter(todo => todo.uid !== delEleId)
    removeTodo(); 
}