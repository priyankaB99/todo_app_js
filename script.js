var todosList = [];

function printTodos() {
    document.getElementById("todoList").innerHTML = "";
    let i;
    let checked;
    let complete;
    for (i=0; i<todosList.length; i++) {
        if (todosList[i].completed == true) {
            checked = " checked"
            complete = true;
        }
        else {
            checked = ""
            complete = false;
        }
        $("#todoList").append(`
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox"${checked} class="${todosList[i].id} ${complete}" onchange="completeTodo(this)" name="todoItem${i}" value="${todosList[i].text}">
                </div>
            </div>
            <label for="todoItem${i}" class="form-check-label todoItem${checked}"> ${todosList[i].text}</label>
            <span class="close ${todosList[i].id}" onclick="deleteTodo(this)">X</span><br></br>
        </div>`);
    }
}

//LOAD ALL TODOS
function loadTodos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            todosList = todos;
            printTodos();
        }
        else {
            console.log("Load error", this);
        }
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","3144ca-65eefb-684545-408bc6-a79a27");
    xhttp.send();
}

//ADDING TODO ITEM
function addTodo(event) {
    event.preventDefault();
    let newTodo = document.getElementById("newTodoInput").value;
    document.getElementById("newTodoInput").value = "";
    // Setting variable for form input
    var data = {
        text: newTodo
    };
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            loadTodos();
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log("post error", this);
        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", '3144ca-65eefb-684545-408bc6-a79a27');
    xhttp2.send(JSON.stringify(data));
}

function deleteTodo(event) {
    console.log("d", event.classList[1]);
    // Setting variable for ToDo id
    var id = event.classList[1];
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            loadTodos()
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this);
        }
    };
    xhttp2.open("DELETE", "https://cse204.work/todos/"+id, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "3144ca-65eefb-684545-408bc6-a79a27");
    xhttp2.send();
}

function completeTodo(event) {
    var id = event.classList[0];

    var newCompleted;
    if (event.classList[1] == "true") {
        newCompleted = false;
    }
    else {
        newCompleted = true;
    }
    console.log(newCompleted)

    // Setting variable for form input
    var data = {
        completed: newCompleted
    }
    console.log(JSON.stringify(data));
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            loadTodos();
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log("put error", this);
        }
    };
    xhttp2.open("PUT", "https://cse204.work/todos/"+id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", '3144ca-65eefb-684545-408bc6-a79a27');
    xhttp2.send(JSON.stringify(data));
}

function eventListeners() {
    loadTodos();
    document.getElementById("newTodoInput").value = "";
    document.getElementById("addForm").addEventListener("submit", addTodo);
}
document.addEventListener("DOMContentLoaded", eventListeners);


