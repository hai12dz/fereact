import './style.css'

const SecondComponent = () => {
    const a = [1, 2, 3, 4];
    return (
        <>

            <div className="hello">
                {JSON.stringify(a)}  second component
            </div>
            <div>{console.log("haidaoit")}</div>

            <div className="hello" style={{ borderRadius: "10px" }}>
                third component

            </div>
        </>
    )
}

export { SecondComponent };
