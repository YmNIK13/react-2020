import React, {useEffect, useReducer} from 'react';
import TodoList from "./Todo/TodoList";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

import Context from "./context";
import reduser from "./reduser";



// ленивая загрузка компонентов
const AddTodo = React.lazy(() => new Promise(resolve => setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
    }, 3000))
)

function getDefaultToofos() {
    const raw = localStorage.getItem('todos') || JSON.stringify([])
    return JSON.parse(raw)
}

function App() {
    // используем reduser
    // https://www.youtube.com/watch?v=l4tKCCGUeMo&list=PLqKQF2ojwm3n6YO3BDSQIg35GGKn_ImFD&index=4
    const [state, dispatch] = useReducer(reduser, getDefaultToofos())
    // используем для хранения состояния
    const [loading, setLoading] = React.useState(true)

    /* Хук для подгрузки данных
  https://www.youtube.com/watch?v=hwPo6OLBbD8&list=PLqKQF2ojwm3n6YO3BDSQIg35GGKn_ImFD&index=2
  вторым параметром передаем список(переменные) зависимостей от которых будет перерисовываться компонент
  так как у нас таких зависимостей нет то передаем пустой массив */
    useEffect(() => {
        if (state.length > 0) {
            setLoading(false)
        } else {
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
                .then(response => response.json())
                .then(json => {
                    setTimeout(() => {
                        dispatch({
                            type: 'new',
                            payload: json
                        })
                        setLoading(false)
                    }, 1500)
                })
        }
    }, [])

    // сохраняем задания в сторедж
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state))
    }, [state])


    function addTodo(title) {
        dispatch({type: 'add', payload: title})
    }

    return (
        <Context.Provider value={{dispatch}}>
            <div className='wrapper'>
                <h1>React tutorial</h1>
                <Modal/>
                <React.Suspense fallback={<p>Loading ...</p>}>
                    <AddTodo onCreate={addTodo}/>
                </React.Suspense>
                {
                    loading ? <Loader/>
                        : (state.length > 0 ? (<TodoList todos={state}/>) : (<p>No todos!</p>))
                }
            </div>
        </Context.Provider>
    );
}

export default App;
