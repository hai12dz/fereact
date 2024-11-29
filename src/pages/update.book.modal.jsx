import { useEffect, useState } from "react"
import { Input, notification, Modal, Select } from "antd";
import { handleUploadFile, updateBookAPI, updateUserAPI } from "../services/api.service";
const UpdateBookModal = (props) => {

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")

    // const [isModalUpdateOpen,setIsModalUpdateOpen] = useState(true)
    //const { loadUser } = props
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [category, setCategory] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState()



    useEffect(() => {
        console.log("hello update")
        if (dataUpdate) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)

        }
    }, [dataUpdate])


    const handleChange = (value) => {
        setCategory(value)

    };
    const handleSubmitBtn = async () => {
        if (selectedFile !== null) {
            const resUpload = await handleUploadFile(selectedFile, "book")
            if (resUpload.data) {
                console.log(resUpload)

            }
            else {
                notification.error({
                    message: "Error update book",
                    description: "Bạn phải upload file"

                })
            }

            const res = await updateBookAPI(id, resUpload.data.fileUploaded, price, mainText, author, quantity, category)
            if (res) {
                resetAndCloseModal()
                loadBook();
                notification.success({
                    message: "update a book",
                    description: "update thanh cong"

                })
            }
            else {
                notification.error({
                    message: "Error update book",
                    description: JSON.stringify(res.message)

                })
            }


            return
        }

        else if (selectedFile === null && preview !== null) {


            const res = await updateBookAPI(id, dataUpdate.thumbnail, price, mainText, author, quantity, category)
            if (res) {
                resetAndCloseModal()
                loadBook();
                notification.success({
                    message: "update a book",
                    description: "update thanh cong"

                })
            }
            else {
                notification.error({
                    message: "Error update book",
                    description: JSON.stringify(res.message)

                })
            }


            return
        }

        else {


            return
        }



    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setAuthor(null)
        setCategory(null)
        setPrice(null)
        setQuantity(null)
        setMainText(null)
        setPreview(null)
        setDataUpdate(null)
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
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => { handleSubmitBtn() }}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}


        >


            <div>
                <span>Id:</span>
                <Input value={id} disabled
                    onChange={(event) => { setId(event.target.value) }}

                />

            </div>
            <div>
                <span>Tiêu đề:</span>
                <Input value={mainText}
                    onChange={(event) => { setMainText(event.target.value) }}

                />

            </div>
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
                    value={category}
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

export default UpdateBookModal