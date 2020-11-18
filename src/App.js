import React from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";

function App() {
    // используем для хранения состояния
    const [todos, setTodos] = React.useState([
        {id: 1, completed: false, title: 'купить хлеб'},
        {id: 2, completed: true, title: 'купить масло'},
        {id: 3, completed: false, title: 'купить молоко'},
    ])

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

    return (
        <Context.Provider value={{removeTodo}}>
            <div className='wrapper'>
                <h1>React tutorial</h1>
                {todos.length > 0
                    ? (<TodoList todos={todos} onToggle={toggleTodo}/>)
                    : (<p>No todos!</p>)
                }
            </div>
        </Context.Provider>
    );
}

export default App;
