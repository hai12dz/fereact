import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>> check values: ", values)
        const res = await registerUserAPI(

            values.fullName,
            values.email,
            values.password,
            values.phone


        )

        if (res.data) {

            notification.success({
                message: "Register user",
                description: "Dang ky user thanh cong"

            })
            navigate("/login")
        }
        else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message)

            })
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}
        >

            <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>

            <Row justify={"center"}>
                <Col xs={24} md={6}>

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>

                <Col xs={24} md={6}>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>

                <Col xs={24} md={6}>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your pw!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>

                <Col xs={24} md={6}>

                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[

                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }

                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

            </Row>
            <Row justify={"center"}>

                <Col xs={24} md={6}>

                    <div >
                        <Button justify={"center"}
                            onClick={() => form.submit()}
                            type="primary">Register</Button>

                        {/* <Button
                            onClick={() => {
                                form.setFieldsValue({ email: "h@gm.com", fullName: "a" });
                                form.getFieldValue("email")
                            }}

                            type="primary">Test</Button> */}

                    </div>
                </Col>

            </Row>


            <Row justify={"center"}>


                <Col xs={24} md={6}>
                    <Divider />
                    <div>  <p>Đã có tài khoản?  <Link to={"/login"}>Đăng nhập tại đây</Link>  </p>
                    </div>
                </Col>

            </Row>

        </Form>
    )
}


export default RegisterPage