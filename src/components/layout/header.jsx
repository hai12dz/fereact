import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { UsergroupAddOutlined, AuditOutlined, MailOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
//import './header.css'
import { Menu, message } from 'antd'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location && location.pathname) {
            const allRoute = ["users", "books"]
            const currentRoute = allRoute.find(item => `${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            }
            else {
                setCurrent("home")
            }
        }

    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            localStorage.removeItem("access_token")
            setUser(
                {
                    email: "",
                    phone: "",
                    fullName: "",
                    role: "",
                    avatar: "",
                    id: ""
                }
            )


            message.success("Logout thanh cong")
            navigate("/")
        }

    }
    const { user, setUser } = useContext(AuthContext)
    //console.log("checkdata <<<<", user)


    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}> Home</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,

            key: 'users',
            icon: <UsergroupAddOutlined />
        },
        {
            label: <Link to={"/books"}>Books</Link>,

            key: 'books',
            icon: <AuditOutlined />,

        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => { handleLogout() }}>Đăng xuất</span>,
                    key: 'logout',
                },
            ],
        }] : []),








    ];

    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />)


}


export default Header