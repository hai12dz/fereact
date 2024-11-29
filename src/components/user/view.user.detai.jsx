import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';
const UserDetail = (props) => {
    // const [open, setOpen] = useState(false);
    // const showDrawer = () => {
    //     setOpen(true);
    // };
    // const onClose = () => {
    //     setOpen(false);
    // };

    const { open, showDrawer, onClose, dataDetail, loadUser } = props

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const handleUpdateUserAvatar = async () => {

        //upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        console.log("check file ", resUpload)

        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded
            console.log("mew data ", newAvatar)
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)


            if (resUpdateAvatar) {
                onClose();
                setSelectedFile(null)
                setPreview(null)
                loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: "Cap nhat avatar thanh cong"

                })
            }
            else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)

                })
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)

            })
        }
        //update user


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
        <>

            <Drawer width={"40vw"} title="Chi tiết User" onClose={onClose} open={open}>
                {dataDetail ? (
                    <>
                        <p>Id: {dataDetail._id}</p>
                        <p>FullName: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>

                        <p>PhoneNumber: {dataDetail.phone}</p>
                        <br />
                        <p>Avatar:</p>
                        <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "1px solid" }}>
                            <img
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain'
                                }}

                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                        </div>

                        <div>  <label style={{
                            display: "block", width: "fit-content",
                            marginTop: "15px", padding: "5px 10px", background: "orange",
                            borderRadius: "5px", cursor: "pointer"
                        }} htmlFor='btnUpload'>Upload avatar </label>
                            <input onChange={handleOnChangeFile}
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
                                <Button
                                    onClick={() => handleUpdateUserAvatar()}
                                    type='primary'>Save</Button>
                            </>

                        }
                    </>


                ) : (
                    <p>Loading...</p>
                )}
            </Drawer>
        </>
    );


}
export default UserDetail