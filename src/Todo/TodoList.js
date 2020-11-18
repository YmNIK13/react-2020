import React from "react";
import PropTypes from "prop-types"
import TodoItem from "./TodoItem";

const style = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    }
}

function TodoList(props) {
    const {todos} = props;

    return (
        <ul style={style.ul}>
            {
                todos.map((todo, idx) => {
                    return <TodoItem
                        key={todo.id}
                        todo={todo}
                        onChange={props.onToggle}
                        index={idx}
                    />
                })
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default TodoList

