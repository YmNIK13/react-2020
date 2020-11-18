import React, {useContext} from "react";
import PropTypes from "prop-types"
import Context from "../context";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem({todo, index}) {
    // передаем ссылку на функцию через контекст (глобальная область видимости)
    // https://www.youtube.com/watch?v=QPEB3ZQLTZY&list=PLqKQF2ojwm3n6YO3BDSQIg35GGKn_ImFD&index=3
    const {dispatch} = useContext(Context)

    const classes = []
    if (todo.completed) {
        classes.push('done')
    }
    return (
        <li style={styles.li}>
            <span className={classes.join(' ')}>
                <input type="checkbox" checked={todo.completed} style={styles.input}
                       onChange={() => dispatch({type: 'toggle', payload: todo.id})}
                />
                <strong>{index + 1}</strong>
                &nbsp;&nbsp;
                {todo.title}
            </span>
            <button
                // альтернативный способ onClick={() => removeTodo(todo.id)}
                // еще один       способ onClick={removeTodo.bind(null, todo.id)}
                onClick={() => dispatch({type: 'remove', payload: todo.id})}
                className='rm'>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
}


export default TodoItem