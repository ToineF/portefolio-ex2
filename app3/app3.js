const input = document.querySelector("#input")
const addButton = document.querySelector("#addButton")
const todoContainer = document.querySelector("#todoContainer")

fetch("https://dummyjson.com/todos")
.then(res => res.json())
.then(data => data.todos)
.then(todos => {
    todos.forEach(todo => {
        todoContainer.innerHTML += `<p>${todo.todo}</p>`
    });
})