import { Button, Input, Modal, Popconfirm, Select, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification } from "antd";
import { useEffect, useState } from "react";
import { createBookAPI, fetchAllBookAPI, handleUploadFile } from '../services/api.service';
import BookDetail from './view.book.detail';

const CreateControllerBook = (props) => {
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [category, setCategory] = useState("")
    const [preview, setPreview] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)

    const { loadBook, setIsModalOpen, isModalOpen } = props

    const handleChange = (value) => {
        setCategory(value)

    };
    const handleSubmitBtn = async () => {

        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            console.log(resUpload)

        }
        else {
            notification.error({
                message: "Error create book",
                description: "Bạn phải upload file"

            })
        }


        console.log("check file ", resUpload)


        const resCreateBook = await createBookAPI(author, price, quantity, category, resUpload.data.fileUploaded, "bla bla")
        console.log("check file ", resCreateBook)


        if (resCreateBook) {
            setSelectedFile(null)
            setPreview(null)
            setAuthor(null)
            setPrice(null)
            setQuantity(null)
            setCategory(null)
            setIsModalOpen(false)
            loadBook();
            notification.success({
                message: "Create a book",
                description: "tao moi thanh cong"

            })
        }
        else {
            notification.error({
                message: "Error update avatar",
                description: JSON.stringify(resCreateBook.message)

            })
        }




    }
    const resetAndCloseModal = () => {

        setSelectedFile(null)
        setPreview(null)
        setAuthor(null)
        setPrice(null)
        setQuantity(null)
        setCategory(null)
        setIsModalOpen(false)

    }


    const handleOnChangeFile = (event) => {


        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)

            return
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)

            setPreview(URL.createObjectURL(file))

        }
        console.log("check file  ", preview)
        // I've kept this example simple by using the first image instead of multiple
    }

    return (

        <Modal
            title="Create a book"
            open={isModalOpen}
            onOk={() => { handleSubmitBtn() }}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}


        >
            <div>
                <span>Tác giả:</span>
                <Input value={author}
                    onChange={(event) => { setAuthor(event.target.value) }}

                />

            </div>





            <div>
                <span>Giá tiền:</span>
                <Input value={price}
                    onChange={(event) => { setPrice(event.target.value) }}

                />

            </div>



            <div>
                <span>Số lượng:</span>
                <Input value={quantity}
                    onChange={(event) => { setQuantity(event.target.value) }}

                />

            </div>

            <div>
                <span>Thể loại:</span>
                <Select

                    style={{
                        width: '100%',
                    }}
                    onChange={handleChange}
                    options={[
                        { value: 'Arts', label: 'Arts' },
                        { value: 'Business', label: 'Business' },
                        { value: 'Comics', label: 'Comics' },
                        { value: 'Cooking', label: 'Cooking' },
                        { value: 'Entertainment', label: 'Entertainment' },
                        { value: 'History', label: 'History' },
                        { value: 'Music', label: 'Music' },
                        { value: 'Sports', label: 'Sports' },
                        { value: 'Teen', label: 'Teen' },
                        { value: 'Travel', label: 'Travel' },
                    ]}

                />

            </div>


            <div>  <label style={{
                display: "block", width: "fit-content",
                marginTop: "15px", padding: "5px 10px", background: "orange",
                borderRadius: "5px", cursor: "pointer"
            }} htmlFor='btnUpload'>Upload avatar </label>
                <input
                    onChange={handleOnChangeFile}
                    onClick={(event) => {
                        event.target.value = null
                    }}


                    type="file" hidden id='btnUpload' />
            </div>

            {preview &&
                <>
                    <div style={{
                        marginTop: "10px",
                        marginBottom: "15px",
                        height: "100px",
                        width: "150px",
                    }}>
                        <img
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'contain'
                            }}

                            src={preview} alt="" />
                    </div>

                </>

            }
        </Modal>

    )



}
export default CreateControllerBook