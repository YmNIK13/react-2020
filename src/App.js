import React, {useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

// ленивая загрузка компонентов
const AddTodo = React.lazy(() => new Promise(resolve => setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
    }, 3000))
)

function App() {
    // используем для хранения состояния
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

      /* Хук для подгрузки данных
    https://www.youtube.com/watch?v=hwPo6OLBbD8&list=PLqKQF2ojwm3n6YO3BDSQIg35GGKn_ImFD&index=2
    вторым параметром передаем список(переменные) зависимостей от которых будет перерисовываться компонент
    так как у нас таких зависимостей нет то передаем пустой массив */
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
                <Modal/>
                <React.Suspense fallback={<p>Loading ...</p>}>
                    <AddTodo onCreate={addTodo}/>
                </React.Suspense>
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
