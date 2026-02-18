const button = document.querySelector('.add-tood-btn');
const input = document.querySelector('.todo-input')
const list = document.querySelector('.todo-list')

const BACKEND_URL = "http://localhost:3000"
const TODOS_URL = `${BACKEND_URL}/todos`



const fetchAllTodos = ()=> {
    fetch(TODOS_URL)
        .then(res => res.json())
        .then(res => {
            const todos = res.todos

            console.log(todos)

            list.innerHTML = ""
            todos.forEach(todo => {
                const li = document.createElement('li')
                li.textContent = todo.task
                
                list.appendChild(li)
            });
        })
        .catch(err => {
            console.log('nie dzuala')
        })
}

fetchAllTodos()

