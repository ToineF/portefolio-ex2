const input = document.querySelector("#input")
const addButton = document.querySelector("#addButton")
const todoContainer = document.querySelector("#todoContainer")
let todoArray = []
let checkboxArray=[]

// const div0 = document.querySelector("#div0")

// div0.children[0].addEventListener('change', () => {
//     div0.children[0].checked ? div0.children[1].className = "line-through" : div0.children[1].className = ""
//     console.log("hey")
// })



function todoTemplate(todo) {
    // todoArray.push(todo)
    // checkboxArray.push(todo.completed)
    return `<div class="flex gap-2 todo">
                <button class="text-red-500">
                    <img class="h-4" src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png">
                </button>
                <input type="checkbox" ${todo.completed ? "checked" :""}>
                <p class="${todo.completed ? "line-through" :""}">${todo.todo}</p>
               
            </div>`
}

function todoUpdate() {
    todoContainer.innerHTML=""
    todoArray.forEach(todo => {
        todoContainer.innerHTML += todo
    })
}


fetch("https://dummyjson.com/todos")
.then(res => res.json())
.then(data => data.todos)
.then(todos => {
    todos.forEach(todo => {
        todoArray.push(todoTemplate(todo))
    });    
    todoUpdate()
    //checkboxArray = document.querySelectorAll("input[type=\"checkbox\"]")
})
.catch((error) => {
    todoContainer.innerHTML = `Error: ${error}`
});




addButton.addEventListener('click', () => {
    const newTodo = {
        todo: input.value,
        completed: false
    }
    if (!newTodo.todo) {
        return
    }
    todoArray.unshift(todoTemplate(newTodo))
    todoUpdate()
    input.value = ""
})