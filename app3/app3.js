const input = document.querySelector("#input")
const addButton = document.querySelector("#addButton")
const todoContainer = document.querySelector("#todoContainer")
let todoArray = []
let todoDIVArray=[]


function todoTemplate(todo) {
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
    todoDIVArray = Array.from(document.querySelectorAll(".todo"))
    todoDIVArray.forEach((todo,index) => {
        const deleteButton = todo.children[0]
        const checkbox = todo.children[1]
        const line = todo.children[2].innerText
        deleteButton.addEventListener('click', () => {
            todoDIVArray.splice(index,1)
            todoArray.splice(index,1)
            todoUpdate()
        })
        checkbox.addEventListener('click', () => {
            const newTodo = {
                todo: line,
                completed: checkbox.checked
            }
            todoArray[index] = todoTemplate(newTodo)
            todoUpdate()
        })
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