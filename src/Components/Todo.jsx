import './CSS/Todo.css';
import { useState, useRef, useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }]);
        inputRef.current.value = ""; // Clear the input field
        localStorage.setItem("todos_count", count);
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(storedTodos);
        count = localStorage.getItem("todos_count") || 0;
    }, []);

    useEffect(() => {
        const saveTodos = () => {
            localStorage.setItem("todos", JSON.stringify(todos));
        };

        const timer = setTimeout(saveTodos, 100);

        return () => clearTimeout(timer);
    }, [todos]);

    return (
        <div className='todo'>
            <div className="todo-header">To-do List</div>
            <div className="todo-add">
                <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input'/>
                <div onClick={add} className="todo-add-btn">ADD</div>
            </div>

            <div className="todo-list">
                {todos.map((item, index) => (
                    <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/> 
                ))}
            </div>
        </div>
    );
};

export default Todo;
