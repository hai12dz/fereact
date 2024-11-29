import { InputNumber, Modal, notification } from "antd";
import { useState } from "react";
import { Button, Form, Input, Select, Space } from 'antd';
import { createBookAPI, handleUploadFile } from "../services/api.service";
const CreateUncontrollerBook = (props) => {

    const { loadBook, setIsModalOpen, isModalOpen } = props
    const [form] = Form.useForm();

    const [preview, setPreview] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)




    const { Option } = Select;
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




    const handleChange = (value) => {

    };

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

    const resetAndCloseModal = () => {

        form.resetFields()
        setSelectedFile(null)
        setPreview(null); // Reset ảnh preview
        setIsModalOpen(false)

    }
    const onGenderChange = (value) => {

    };
    const onFinish = (values) => {

        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };
    const handleSubmitBtn = async (values) => {
        const { mainText, author, price, quantity, category } = values;

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


        const resCreateBook = await createBookAPI(author, price, quantity, category, resUpload.data.fileUploaded, mainText)
        console.log("check file ", resCreateBook)


        if (resCreateBook) {
            resetAndCloseModal()
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

    return (




        <Modal
            title="Create a book (uncontroller)"
            open={isModalOpen}
            onOk={() => form.submit()}
            okButtonProps={{ loading: true }}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}


        >





            <div>


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
                    <div>
                        <Form.Item
                            name="mainText"
                            label="Tiêu đề"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            name="author"
                            label="Tác giả"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>

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
                    </div>






                    <div>
                        <Form.Item
                            name="quantity"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
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

            {
                preview &&
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
        </Modal >


    )

}
export default CreateUncontrollerBook