

class Schedule {
    constructor() {
        this._todos = [];
    }
    getSchedule() {
        return this._todos;
    }
    setSchedule(todos) {
        this._todos = todos
    }

    addToDo(e) {
        this._todos.push(e);
    }
    removeToDo(e) {
        this._todos.splice(e, 1);
        console.log(e);
    }
}

let visible = false;
let schedule =  new Schedule();

const insert =  (e) => {
    let inputextValue;
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which
    if (keyCode == '13') {
        inputextValue = document.getElementById("inputTextToDo").value;
        insertToDos(inputextValue);
        viewInsert();
    }
}

const insertToDos =  (valueInput) =>{
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (getSchedule != null) {
        schedule.setSchedule(getSchedule._todos);
    }
    let inputextValue = valueInput;
    if (typeof (Storage) !== "undefined" || (inputextValue != null && inputextValue != 'undefined')) {
        var todo = {
            _content: inputextValue,
            _status: false
        }
        schedule.addToDo(todo);
        localStorage.setItem("schedule", JSON.stringify(schedule));
    }
    document.getElementById("inputTextToDo").value = "";
}

const viewInsert =  ()=> {
    let sizeTodo = showToDoAfterInsert();
    viewFooter(sizeTodo);
}

const completeElement =  (todo, idTodo) =>{

    let elementNeedInsert = "";

    if (todo._status == false) {
        elementNeedInsert = `<li id="${idTodo}-Child"  class="borderbox"><span onClick="checkComplete(${idTodo})" class="oi oi-check"></span><label onClick="edit('${idTodo}-Child','${idTodo}')">${todo._content}</label><button type="button"   onclick="deleteTodo('${idTodo}')" class="close destroy" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button></li>`;
    } else if (todo._status == true) {
        elementNeedInsert = `<li id="${idTodo}-Child"  class="borderbox"><span onClick="checkComplete(${idTodo})" class="oi oi-check"></span><label ><strike>${todo._content}</strike></label><button type="button"   onclick="deleteTodo('${idTodo}')" class="close destroy" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button></li>`
    }
    return elementNeedInsert;
}
const viewBodyWhenOnLoad =  () => {
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    let sizeToDo = todos.length;
    let list = document.getElementById('listToDo');
    list.innerHTML = "";

    for (let i = 0; i < sizeToDo; i++) {

        list.innerHTML += completeElement(todos[i], i);

    }
    return sizeToDo;
}

const showToDoAfterInsert =  () =>{
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    let indexWantInsert = todos.length;
    let list = document.getElementById('listToDo');

    list.innerHTML += `<li id="${indexWantInsert-1}-Child"  class="borderbox"><span onClick="checkComplete(${indexWantInsert-1})" class="oi oi-check"></span><label onClick="edit('${indexWantInsert - 1}-Child','${indexWantInsert - 1}')" >${todos[indexWantInsert - 1]._content}</label><button type="button" id="${indexWantInsert}-closebutton"  onclick="deleteTodo('${indexWantInsert}')" class="close destroy" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button></li>`;


    if (indexWantInsert == 1) {
        document.getElementById('divInputText').innerHTML = inserDrownIcon();
    }
    return indexWantInsert;
}

const viewFooter =  (e) =>{
    if (e != 0) {
        document.getElementById('footer').innerHTML = ` <footer >
        <div class="borderbox">
        <div class="row">
        <div class="col-md-4 text-center">
        ${e} iteam left
        </div>
        <div class="col-md-auto">
        <a href="#/" onClick="showAll()" class="selected">All</a>
        <a href="#/" onClick="showActive()"class="selected">Active</a>
        <a href="#/" onClick="showCompleted()"class="selected">Completed</a>
        </div>
        <div class="col col-md-4 text-right">
        <a href="#/" onClick="cleanToDoHaveStatus('true')"class="selected"> Clear completed</a>
        </div>
        </div>
        </div>
        </footer>`;
    } else {
        document.getElementById('footer').innerHTML = "";
    }
}
const inserDrownIcon =  (e)=> {
    var drownIcon = `<span class="oi oi-chevron-bottom" onClick="checkAllComplete()" id="drowIcon"></span>`;
    return drownIcon;
}

const deleteTodo =  (indexTodo) =>{
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    schedule.setSchedule(getSchedule._todos);
    schedule.removeToDo(indexTodo);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
}
const load =  () => {
    let exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        let sizeTodo = viewBodyWhenOnLoad();
        viewFooter(sizeTodo);
        let drowIcon = document.getElementById("drowIcon");
        if (sizeTodo > 0) {

            if (drowIcon == null) {
                document.getElementById('divInputText').innerHTML = inserDrownIcon();
            }
        } else if (sizeTodo == 0 && drowIcon != null) {
            document.getElementById('divInputText').removeChild(drowIcon);
        }
    }
}
const checkComplete =  (indexTodo)=> {

    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;

    let status = todos[indexTodo]._status;
    if (status == true) {
        todos[indexTodo]._status = false;
    } else {
        todos[indexTodo]._status = true;
    }
    schedule.setSchedule(todos);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();

}
const checkAllComplete =  () => {
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    let sizeToDo = todos.length;
    for (let i = 0; i < sizeToDo; i++) {
        let status = todos[i]._status;
        if (status == false) {
            todos[i]._status = true;
        }
    }
    schedule.setSchedule(todos);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
}
const showAll =  () =>{
    load();
}
const showActive =  () => {
    let exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        let sizeTodo = activeOrCompletedTodo(false);
        viewFooter(sizeTodo);
    }

}

const activeOrCompletedTodo =  (status) => {
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    let sizeToDo = todos.length;

    let list = document.getElementById('listToDo');

    list.innerHTML = "";
    for (let i = 0; i < sizeToDo; i++) {
        if (todos[i]._status == status) {
            list.innerHTML += completeElement(todos[i], i);
        }



    }
    return sizeToDo;
}
const showCompleted =  () => {
    let exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        let sizeTodo = activeOrCompletedTodo(true);
        viewFooter(sizeTodo);
    }
}
const cleanToDoHaveStatus =  (status)=> {
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    let sizeToDo = todos.length;

    schedule.setSchedule(todos);
    for (let i = 0; i < sizeToDo;) { 

        if (todos[i]._status == true) {
            schedule.removeToDo(i);   
            sizeToDo--;         
        }else{
            i++
        }
    } 
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();

}

const edit =  (index, i)=> {
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;

    let contentEdit = todos[i]._content;
    document.getElementById(index).innerHTML = ` <div class="padding input-group bg-white border border-secondary">
    <div id="divInputText"></div> 
    <input type="text" id="inputEditText" value="${contentEdit}" class="form-control border border-light" onkeydown="update('${i}')">
    </div>`
    


}
const update =  (i,e) =>{
    let getSchedule = JSON.parse(localStorage.getItem('schedule'));
    let todos = getSchedule._todos;
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which
    if (keyCode == '13') {
        todos[i]._content  = document.getElementById("inputEditText").value; 
        schedule.setSchedule(todos);
        localStorage.setItem("schedule", JSON.stringify(schedule));
        load();
    }
}