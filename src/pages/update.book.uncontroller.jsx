import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Modal, notification, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { handleUploadFile, updateBookAPI } from '../services/api.service';


const UpdateBookModalUncontroller = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props


    useEffect(() => {
        console.log("hello update")
        if (dataUpdate) {
            // setId(dataUpdate._id)
            // setMainText(dataUpdate.mainText)
            // setAuthor(dataUpdate.author)
            // setPrice(dataUpdate.price)
            // setQuantity(dataUpdate.quantity)
            // setCategory(dataUpdate.category)
            // setSelectedFile
            // setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)

            const data = {
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,


            };
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
            // Set giá trị cho form
            form.setFieldsValue(data);

        }
    }, [dataUpdate])

    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 24,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };








    const [form] = Form.useForm();



    const onGenderChange = (value) => {

    };

    const handleSubmitBtn = async (values) => {
        const id = form.getFieldValue('id')
        const price = form.getFieldValue('price')
        const mainText = form.getFieldValue('mainText')
        const author = form.getFieldValue('author')
        const quantity = form.getFieldValue('quantity')
        const category = form.getFieldValue('category')

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
        form.resetFields();
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
            onOk={() => form.submit()}

            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}


        >





            <Form
                {...layout}
                form={form}
                layout={'vertical'}
                name="control-hooks"
                onFinish={handleSubmitBtn}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label="Id"
                    name="id"


                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Please input !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Thể loại"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="Business">Business</Option>
                        <Option value="Comics">Comics</Option>
                        <Option value="Cooking">Cooking</Option>
                        <Option value="Entertainment">Entertainment</Option>
                        <Option value="Cooking">Cooking</Option>
                        <Option value="History">History</Option>
                        <Option value="Music">Music</Option>
                        <Option value="Sports">Sports</Option>
                        <Option value="Teen">Teen</Option>
                        <Option value="Travel">Travel</Option>

                    </Select>
                </Form.Item>

            </Form>
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
export default UpdateBookModalUncontroller;