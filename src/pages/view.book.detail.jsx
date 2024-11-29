import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const BookDetail = (props) => {


    const { open, setOpen, showDrawer, onClose, dataDetail } = props
    return (
        <>

            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                {dataDetail ? (
                    <>

                        <p>Id: {dataDetail._id}</p>
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <p>Tác giả: {dataDetail.author}</p>

                        <p>Thể loại: {dataDetail.category}</p>
                        <p>Giá cả: {dataDetail.price}</p>
                        <p>Số lượng: {dataDetail.quantity}</p>

                        <p>Đã bán: {dataDetail.sold}</p>


                        <br />
                        <p>Thumbnail:</p>
                        <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "1px solid" }}>
                            <img
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain'
                                }}

                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                        </div>

                        {/* <div>  <label style={{
                            display: "block", width: "fit-content",
                            marginTop: "15px", padding: "5px 10px", background: "orange",
                            borderRadius: "5px", cursor: "pointer"
                        }} htmlFor='btnUpload'>Upload avatar </label>
                            <input onChange={handleOnChangeFile}
                                type="file" hidden id='btnUpload' />
                        </div> */}

                        {/* {preview &&
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
                                <Button
                                    onClick={() => handleUpdateUserAvatar()}
                                    type='primary'>Save</Button>
                            </>

                        } */}
                    </>


                ) : (
                    <p>Loading...</p>
                )}
            </Drawer>
        </>
    );
};
export default BookDetail;