const input = document.querySelector("#input")
const addButton = document.querySelector("#addButton")
const todoContainer = document.querySelector("#todoContainer")
let todoArray = []

function todoTemplate(todo) {
    return `<div class="grid todoLine gap-2 todo">
                <button>
                    <img class="" src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png">
                </button>
                <input type="checkbox" ${todo.completed ? "checked" :""}>
                <p class="${todo.completed ? "line-through" :""}">${todo.todo}</p>
               
            </div>`
}

function todoUpdate() {
    todoContainer.innerHTML=""
    todoArray.forEach(todo => {
        todoContainer.innerHTML += todo.text
    })
    const todoDIVArray = Array.from(document.querySelectorAll(".todo"))
    todoDIVArray.forEach((todo,index) => {
        todoArray[index].div = todo
    })
    todoArray.forEach((todo,index) => {
        const deleteButton = todo.div.children[0]
        const checkbox = todo.div.children[1]
        const line = todo.div.children[2].innerText

        deleteButton.addEventListener('click', () => {
            todoArray.splice(index,1)
            todoUpdate()
        })

        checkbox.addEventListener('click', () => {
            const newTodo = {
                todo: line,
                completed: checkbox.checked
            }
            todoArray[index].text = todoTemplate(newTodo)
            todoUpdate()
        })
    })
}


fetch("https://dummyjson.com/todos")
.then(res => res.json())
.then(data => data.todos)
.then(todos => {
    todos.forEach(todo => {
        todoArray.push({
            text: todoTemplate(todo)
        })
    })
    todoUpdate()
})
.catch((error) => {
    todoContainer.innerHTML = `Error: ${error}`
})


addButton.addEventListener('click', () => {
    const newTodo = {
        todo: input.value,
        completed: false
    }
    if (!newTodo.todo) {
        return
    }
    todoArray.unshift({
        text: todoTemplate(newTodo)
    })
    todoUpdate()
    input.value = ""
})