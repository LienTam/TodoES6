'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schedule = function () {
    function Schedule() {
        _classCallCheck(this, Schedule);

        this._todos = [];
    }

    _createClass(Schedule, [{
        key: 'getSchedule',
        value: function getSchedule() {
            return this._todos;
        }
    }, {
        key: 'setSchedule',
        value: function setSchedule(todos) {
            this._todos = todos;
        }
    }, {
        key: 'addToDo',
        value: function addToDo(e) {
            this._todos.push(e);
        }
    }, {
        key: 'removeToDo',
        value: function removeToDo(e) {
            this._todos.splice(e, 1);
            console.log(e);
        }
    }]);

    return Schedule;
}();

var visible = false;
var schedule = new Schedule();

var insert = function insert(e) {
    var inputextValue = void 0;
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        inputextValue = document.getElementById("inputTextToDo").value;
        insertToDos(inputextValue);
        viewInsert();
    }
};

var insertToDos = function insertToDos(valueInput) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (getSchedule != null) {
        schedule.setSchedule(getSchedule._todos);
    }
    var inputextValue = valueInput;
    if (typeof Storage !== "undefined" || inputextValue != null && inputextValue != 'undefined') {
        var todo = {
            _content: inputextValue,
            _status: false
        };
        schedule.addToDo(todo);
        localStorage.setItem("schedule", JSON.stringify(schedule));
    }
    document.getElementById("inputTextToDo").value = "";
};

var viewInsert = function viewInsert() {
    var sizeTodo = showToDoAfterInsert();
    viewFooter(sizeTodo);
};

var completeElement = function completeElement(todo, idTodo) {

    var elementNeedInsert = "";

    if (todo._status == false) {
        elementNeedInsert = '<li id="' + idTodo + '-Child"  class="borderbox"><span onClick="checkComplete(' + idTodo + ')" class="oi oi-check"></span><label onClick="edit(\'' + idTodo + '-Child\',\'' + idTodo + '\')">' + todo._content + '</label><button type="button"   onclick="deleteTodo(\'' + idTodo + '\')" class="close destroy" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n        </button></li>';
    } else if (todo._status == true) {
        elementNeedInsert = '<li id="' + idTodo + '-Child"  class="borderbox"><span onClick="checkComplete(' + idTodo + ')" class="oi oi-check"></span><label ><strike>' + todo._content + '</strike></label><button type="button"   onclick="deleteTodo(\'' + idTodo + '\')" class="close destroy" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n        </button></li>';
    }
    return elementNeedInsert;
};
var viewBodyWhenOnLoad = function viewBodyWhenOnLoad() {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    var sizeToDo = todos.length;
    var list = document.getElementById('listToDo');
    list.innerHTML = "";

    for (var i = 0; i < sizeToDo; i++) {

        list.innerHTML += completeElement(todos[i], i);
    }
    return sizeToDo;
};

var showToDoAfterInsert = function showToDoAfterInsert() {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    var indexWantInsert = todos.length;
    var list = document.getElementById('listToDo');

    list.innerHTML += '<li id="' + (indexWantInsert - 1) + '-Child"  class="borderbox"><span onClick="checkComplete(' + (indexWantInsert - 1) + ')" class="oi oi-check"></span><label onClick="edit(\'' + (indexWantInsert - 1) + '-Child\',\'' + (indexWantInsert - 1) + '\')" >' + todos[indexWantInsert - 1]._content + '</label><button type="button" id="' + indexWantInsert + '-closebutton"  onclick="deleteTodo(\'' + indexWantInsert + '\')" class="close destroy" aria-label="Close">\n    <span aria-hidden="true">&times;</span>\n    </button></li>';

    if (indexWantInsert == 1) {
        document.getElementById('divInputText').innerHTML = inserDrownIcon();
    }
    return indexWantInsert;
};

var viewFooter = function viewFooter(e) {
    if (e != 0) {
        document.getElementById('footer').innerHTML = ' <footer >\n        <div class="borderbox">\n        <div class="row">\n        <div class="col-md-4 text-center">\n        ' + e + ' iteam left\n        </div>\n        <div class="col-md-auto">\n        <a href="#/" onClick="showAll()" class="selected">All</a>\n        <a href="#/" onClick="showActive()"class="selected">Active</a>\n        <a href="#/" onClick="showCompleted()"class="selected">Completed</a>\n        </div>\n        <div class="col col-md-4 text-right">\n        <a href="#/" onClick="cleanToDoHaveStatus(\'true\')"class="selected"> Clear completed</a>\n        </div>\n        </div>\n        </div>\n        </footer>';
    } else {
        document.getElementById('footer').innerHTML = "";
    }
};
var inserDrownIcon = function inserDrownIcon(e) {
    var drownIcon = '<span class="oi oi-chevron-bottom" onClick="checkAllComplete()" id="drowIcon"></span>';
    return drownIcon;
};

var deleteTodo = function deleteTodo(indexTodo) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    schedule.setSchedule(getSchedule._todos);
    schedule.removeToDo(indexTodo);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
};
var load = function load() {
    var exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        var sizeTodo = viewBodyWhenOnLoad();
        viewFooter(sizeTodo);
        var drowIcon = document.getElementById("drowIcon");
        if (sizeTodo > 0) {

            if (drowIcon == null) {
                document.getElementById('divInputText').innerHTML = inserDrownIcon();
            }
        } else if (sizeTodo == 0 && drowIcon != null) {
            document.getElementById('divInputText').removeChild(drowIcon);
        }
    }
};
var checkComplete = function checkComplete(indexTodo) {

    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;

    var status = todos[indexTodo]._status;
    if (status == true) {
        todos[indexTodo]._status = false;
    } else {
        todos[indexTodo]._status = true;
    }
    schedule.setSchedule(todos);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
};
var checkAllComplete = function checkAllComplete() {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    var sizeToDo = todos.length;
    for (var i = 0; i < sizeToDo; i++) {
        var status = todos[i]._status;
        if (status == false) {
            todos[i]._status = true;
        }
    }
    schedule.setSchedule(todos);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
};
var showAll = function showAll() {
    load();
};
var showActive = function showActive() {
    var exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        var sizeTodo = activeOrCompletedTodo(false);
        viewFooter(sizeTodo);
    }
};

var activeOrCompletedTodo = function activeOrCompletedTodo(status) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    var sizeToDo = todos.length;

    var list = document.getElementById('listToDo');

    list.innerHTML = "";
    for (var i = 0; i < sizeToDo; i++) {
        if (todos[i]._status == status) {
            list.innerHTML += completeElement(todos[i], i);
        }
    }
    return sizeToDo;
};
var showCompleted = function showCompleted() {
    var exitSchedule = localStorage.getItem("schedule");
    if (exitSchedule != null) {
        var sizeTodo = activeOrCompletedTodo(true);
        viewFooter(sizeTodo);
    }
};
var cleanToDoHaveStatus = function cleanToDoHaveStatus(status) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    var sizeToDo = todos.length;

    schedule.setSchedule(todos);
    for (var i = 0; i < sizeToDo;) {

        if (todos[i]._status == true) {
            schedule.removeToDo(i);
            sizeToDo--;
        } else {
            i++;
        }
    }
    localStorage.setItem("schedule", JSON.stringify(schedule));
    load();
};

var edit = function edit(index, i) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;

    var contentEdit = todos[i]._content;
    document.getElementById(index).innerHTML = ' <div class="padding input-group bg-white border border-secondary">\n    <div id="divInputText"></div> \n    <input type="text" id="inputEditText" value="' + contentEdit + '" class="form-control border border-light" onkeydown="update(\'' + i + '\')">\n    </div>';
};
var update = function update(i, e) {
    var getSchedule = JSON.parse(localStorage.getItem('schedule'));
    var todos = getSchedule._todos;
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        todos[i]._content = document.getElementById("inputEditText").value;
        schedule.setSchedule(todos);
        localStorage.setItem("schedule", JSON.stringify(schedule));
        load();
    }
};