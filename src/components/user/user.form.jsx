import { ExperimentFilled } from "@ant-design/icons";
import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import axios from "axios";
import { createUserAPI } from "../../services/api.service";
import { json } from "react-router-dom";

const UserForm = (props) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { loadUser } = props

    const a = () => { };
    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)

        if (res.data) {
            notification.success({
                message: "create user",
                description: "tao user thanh cong"


            })
            resetAndCloseModal()
            await loadUser();
        }
        else {

            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)

            })
        }






        console.log("check res", res.data)


    }
    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        setFullName("")
        setEmail("")
        setPassword("")
        setPhone("")
    }

    return (

        <div className="user-form" style={
            {

                margin: "20px 0"

            }

        }>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table User</h3>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        type="primary">Create User</Button>
                </div>





            </div>

            <Modal
                title="Create a user"
                open={isModalOpen}
                onOk={() => { handleSubmitBtn() }}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}


            >
                <div>
                    <span>FullName</span>
                    <Input value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}

                    />

                </div>


                <div>
                    <span>Email</span>
                    <Input value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                </div>

                <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}


                    />

                </div>


                <div>
                    <span>PhoneNumber</span>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}

                    />

                </div>
            </Modal>
        </div>
    )




}

export default UserForm;