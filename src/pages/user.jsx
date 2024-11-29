import React, { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";

const UserPage = () => {
    // State để lưu danh sách người dùng
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)




    // useEffect chỉ chạy 1 lần khi component được mount
    useEffect(() => {
        console.log("Fetching users...");
        loadUser(); // Gọi hàm loadUser để lấy dữ liệu
    }, [current, pageSize]); // Dependency mảng rỗng [] đảm bảo chỉ chạy khi component mount

    // Hàm load dữ liệu người dùng từ API
    const loadUser = async () => {


        const res = await fetchAllUserAPI(current, pageSize)
        //console.log("check res await tu get all user  ", res)
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }

    }

    return (
        <div style={{ padding: "20px" }}>
            {/* Form để tạo người dùng mới */}
            <UserForm loadUser={loadUser} />

            {/* Bảng hiển thị danh sách người dùng */}
            <UserTable dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}

            />

        </div>


    );
};

export default UserPage;
