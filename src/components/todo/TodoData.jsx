const TodoData = (props) => {



    const { todoList } = props
    const { deleteTodo } = props

    console.log(todoList)

    return (
        <div className='todo-data'>

            {todoList.map((item, index) => {
                console.log("check map", item, index)





                return (<div className="todo-item" key={item.id}>
                    <div> {item.name}</div>
                    <button
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            deleteTodo(item.id)

                        }} >Delete</button>
                </div>)

            })}







        </div>


    )


}

export default TodoData;