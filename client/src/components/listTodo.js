import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './editTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    //delete Todo Function
    const deleteTodo = async id => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`,
            {
                method: 'DELETE'
            })
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }
    const getTodos = async () => {
        const res = await fetch('http://localhost:5000/todos');
        const todoArray = await res.json();

        setTodos(todoArray);

        console.log(todoArray);
    }
    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment>
             <table className="table mt-5">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {/*<tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>*/}
                    {
                        todos.map(todo => (
                            <tr key={todo.todo_id}>
                              <td>{todo.todo_id}</td>
                              <td>{todo.description}</td>
                              <td>
                                  <EditTodo todo={todo}/>
                              </td>
                              <td>
                                  <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                              </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListTodos;