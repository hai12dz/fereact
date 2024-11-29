import { Button, Input, Modal, Popconfirm, Select, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { createBookAPI, deleteBookAPI, fetchAllBookAPI, handleUploadFile } from '../services/api.service';
import BookDetail from './view.book.detail';
import CreateControllerBook from './create.book.controller';
import CreateUncontrollerBook from './create.book.uncontroller';
import UpdateBookModal from './update.book.modal';
import UpdateBookModalUncontroller from './update.book.uncontroller';


const BookPage = (props) => {

    const [loadingTable, setLoadingTable] = useState(false)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [dataBooks, setDataBooks] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        loadBook()
    }, [current, pageSize])


    const loadBook = useCallback(async () => {
        setLoadingTable(true)

        const res = await fetchAllBookAPI(current, pageSize)
        //console.log("check res await tu get all user  ", res)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)


    }, [current, pageSize])
    useEffect(() => { loadBook() }, [loadBook])

    const confirm = async (e) => {


        await deleteBookAPI(e._id)
        await loadBook();
        notification.success({
            message: "delete book",
            description: "xoa book thanh cong"


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
            title: 'Tiêu đề',
            dataIndex: 'mainText',

        },
        {

            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => `${text.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} `

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Tác giả',
            dataIndex: 'author',

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
            <div className="user-form" style={
                {
                    margin: "20px"

                }

            }>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>Table User</h3>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            type="primary">Create Book</Button>
                    </div>





                </div>


            </div>
            <Table
                columns={columns}
                dataSource={dataBooks}
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
                loading={loadingTable}

            />

            {/* 

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
            /> */}
            <BookDetail
                showDrawer={showDrawer}
                onClose={onClose}
                open={open}
                dataDetail={dataDetail}



            />
            {/* <CreateControllerBook
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}

            /> */}

            <CreateUncontrollerBook
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}

            />


            {/* <UpdateBookModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}

            /> */}

            <UpdateBookModalUncontroller
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}


            />



        </>
    )





















}

export default BookPage