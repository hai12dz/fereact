
import './todo.css'
import TodoData from './TodoData'
import TodoNew from './TodoNew'

import reactLogo from '../../assets/react.svg'
import { useState } from 'react';



const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "learn react" },
        // { id: 2, name: "watching movie" }

    ])

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 10000), name: name

        }
        setTodoList([...todoList, newTodo])

    }




    const deleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    }

    return (

        <div className="todo-container">

            <div className="todo-title">
                Todo List
            </div>


            <TodoNew
                addNewTodo={addNewTodo}
            />

            {/* {todoList.length > 0 &&
    <TodoData
  
      todoList={todoList}
    />
  
  }
  
  
  {todoList.length === 0 &&
    <div className='todo-image'>
      <img src={reactLogo} className='logo' alt="" />
  
    </div>
  } */}


            {todoList.length > 0 ?
                <TodoData

                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />

                :



                <div className='todo-image'>
                    <img src={reactLogo} className='logo' alt="" />

                </div>
            }




        </div>


    )

}

export default TodoApp