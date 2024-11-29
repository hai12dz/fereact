import { useEffect, useState } from "react"
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {

    const [fullName, setFullName] = useState("")
    const [id, setId] = useState("")
    const [phone, setPhone] = useState("")
    // const [isModalUpdateOpen,setIsModalUpdateOpen] = useState(true)
    //const { loadUser } = props
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    useEffect(() => {
        console.log("hello update")
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)

        }
    }, [dataUpdate])



    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone)

        if (res.data) {
            notification.success({
                message: "update user",
                description: "update user thanh cong"


            })
            resetAndCloseModal()
            await loadUser();
        }
        else {

            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message)

            })
        }






        console.log("check res", res.data)


    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setFullName("")
        setId("")
        setPhone("")
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => { handleSubmitBtn() }}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}


        >

            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>

                <div>
                    <span>Id</span>
                    <Input
                        value={id}

                        disabled
                    />

                </div>

                <div>
                    <span>FullName</span>
                    <Input value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}

                    />

                </div>







                <div>
                    <span>PhoneNumber</span>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}

                    />

                </div>
            </div>

        </Modal>


    )
}

export default UpdateUserModal