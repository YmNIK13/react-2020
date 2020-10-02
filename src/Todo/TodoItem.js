import React from "react";
import PropTypes from "prop-types"

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1 rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    }
}

function TodoItem({todo, index}) {

    return (
        <li style={styles.li}>
            <span>
                <input type="checkbox"/>
            <strong>{index + 1}</strong>
            {todo.title}
            </span>
            <button>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
}


export default TodoItem