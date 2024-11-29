import { Button, Input, Form, notification, Row, Col, Divider, message } from "antd";
import { loginAPI, registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext)

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(

            values.email,
            values.password,


        )

        if (res.data) {

            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")

        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)

            })
        }

        setLoading(false)

    }

    return (

        <Row justify={"center"}>

            <Col xs={24} md={8} >

                <fieldset style={{
                    border: "1px solid",
                    borderRadius: "5px",
                    padding: "15px",
                    margin: "5px"
                }}>

                    <legend>Đăng nhập</legend>



                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                    // onFinishFailed={onFinishFailed}
                    >





                        <Row>

                            <Col xs={24} >

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            type: "email",
                                            message: 'Email khong dung dinh dang',
                                        },

                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row >

                            <Col xs={24} >

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
                                    <Input.Password onKeyDown={(event) => {
                                        if (event.key === "Enter") form.submit()


                                    }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row >

                            <Col xs={24}>

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                        loading={loading}
                                        onClick={() => form.submit()}
                                        type="primary">Login</Button>

                                    <Link to={"/"}>Go to hompage <ArrowRightOutlined /></Link>

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
                            <Col xs={24} >
                                <Divider />
                                <div style={{ textAlign: "center" }}>  Chưa có tài khoản?  <Link to={"/register"}>Đăng ký tại đây</Link>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </fieldset>

            </Col>
        </Row>

    )

}

export default LoginPage