import { Popconfirm, Table } from 'antd';
import { deleteUserAPI } from '../../services/api.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import UserDetail from './view.user.detai';
import { notification } from "antd";
import { useState } from "react";



const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props

    const confirm = async (e) => {
        if (["admin@gmail.com", "guest@gmail.com", "user@gmail.com"].includes(e.email)) {

            notification.error({
                message: "delete user",
                description: "Không thể xóa người dùng này"


            })
            return;
        }
        await deleteUserAPI(e._id);
        await loadUser();

        notification.success({
            message: "delete user",
            description: "xoa user thanh cong"


        })
    };


    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [dataDetail, setDataDetail] = useState(null);



    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [

        {
            title: "STT",
            render: (_, record, index) => {

                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }






        },


        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (

                    <a onClick={() => {
                        setDataDetail(record)
                        showDrawer(true)
                    }} href="#">{record._id}</a>


                )


            }

        },

        {
            title: 'fullName',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (

                <div style={{ display: "flex", gap: "20px" }}>

                    <EditOutlined
                        onClick={() => {
                            //  console.log("check record ", record)
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        placement="topLeft"
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { confirm(record) }}
                        okText="Yes"
                    >
                        <DeleteOutlined


                            style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>





                </div>
            ),
        },

    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];





    const onChange = (pagination, filters, sorter, extra) => {

        console.log("check tham so ", { pagination, filters, sorter, extra })
        //neu thay doi trang
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)//"5"->5
            }


        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }


        }



    };


    return (
        <>

            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />



            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}

            />

            <UserDetail
                open={open}
                showDrawer={showDrawer}
                onClose={onClose}
                dataDetail={dataDetail}
                loadUser={loadUser}
            />





        </>
    )





















}

export default UserTable