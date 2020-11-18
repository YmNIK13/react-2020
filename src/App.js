import React, {useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";

function App() {
    // используем для хранения состояния
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    // вторым параметром передаем второй массив зависимостей
    // так как у нас таких зависимостей нет то передаем пустой массив
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    setTodos(json)
                    setLoading(false)
                }, 1500)
            })
    }, [])

    function toggleTodo(id_item) {
        setTodos(todos.map(todo => {
            if (todo.id === id_item) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    function removeTodo(todo_id) {
        setTodos(todos.filter(todo => {
            return todo.id !== todo_id
        }))
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className='wrapper'>
                <h1>React tutorial</h1>
                <AddTodo onCreate={addTodo}/>
                {
                    loading
                        ? <Loader/>
                        : todos.length > 0
                        ? (<TodoList todos={todos} onToggle={toggleTodo}/>)
                        : (<p>No todos!</p>)
                }
            </div>
        </Context.Provider>
    );
}

export default App;
