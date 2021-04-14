//LOAD ALL TODOS
function loadTodos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            console.log(todos);
        }
        else {
            console.log(this);
        }
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","3144ca-65eefb-684545-408bc6-a79a27");
    xhttp.send();
}

//ADDING TODO ITEM
function addTodo(event) {
    let newTodo = document.getElementById("newTodoInput").value;
    // Setting variable for form input
    var data = {
        text: "hello"
    }
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            console.log(todo);
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this);
            // console.log(this.responseText);
        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", '3144ca-65eefb-684545-408bc6-a79a27');
    xhttp2.send(JSON.stringify(data));
}

function eventListeners() {
    loadTodos();
    document.getElementById("addTodoButton").addEventListener("click", addTodo);
}
document.addEventListener("DOMContentLoaded", eventListeners);


