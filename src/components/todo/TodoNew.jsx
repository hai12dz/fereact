import { useState } from "react"
const TodoNew = (props) => {

    const [valueInput, setValueInput] = useState("haidao")



    const { addNewTodo } = props

    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")

    }

    const handleChange = (name) => {
        setValueInput(name)

    }


    return (
        <div className='todo-new'>
            <input placeholder='Enter your task' type="text"
                onChange={(event) => handleChange(event.target.value)}
                value={valueInput}
            />
            <button onClick={handleClick} style={{ cursor: "Pointer" }} >Add</button>
            <div>
                My text input is {valueInput}
            </div>


        </div >


    )


}

export default TodoNew;