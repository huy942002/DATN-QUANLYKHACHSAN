import { Form, Input, InputNumber, Modal, Switch, Upload } from "antd";
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import axios from "axios";

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const CreateKindOfRoom = () => {

    const validateMessages = {
        required: 'Vui lòng nhập ${label}!',
        types: {
          email: '${label} không đúng định dạng!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
        phoneNumber: {
            validator: (_, value) => {
                console.log(_);
                if(value) {
                    if(/(0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
                        return Promise.resolve();
                    }
                    return Promise.reject(_.field + ' chưa đúng!');
                }
                return Promise.resolve();
            }
        },
        space: {
            validator: (_, value) => {
                if(value) {
                    if(value.trim()) {
                        return Promise.resolve();
                    }
                    return Promise.reject(_.field + ' không được để trống!');
                }
                return Promise.resolve();
            }
        },
        specialCharacters: {
            validator: (_, value) => {
                if(value) {
                    if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
                        return Promise.reject(_.field + ' không được có ký tự đặc biệt!');
                    }
                    return Promise.resolve();
                }
                return Promise.resolve();
            }
        }
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        );
    };

    const handleChange = ({ fileList: newFileList }) => {
        // console.log(newFileList);
        // setFileList(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const uploadImgae = async (dataImage) => {
        const params = new FormData();
        params.append('file', dataImage);
        params.append('upload_preset', 'image-kind-of-room');
        params.append('cloud_name', 'dmfge68ok');
        params.append('folder', 'kind-of-room');
        await axios
            .post('https://api.cloudinary.com/v1_1/dmfge68ok/image/upload', params)
            .then(
                (res) => {
                    if(res.status === 200) {
                        const image = {
                            uid: res.data.public_id,
                            name: res.data.public_id,
                            status: 'done',
                            url: res.data.url,
                        }
                        let listImage = fileList;
                        listImage.push(image);
                        setFileList(listImage);
                    }
                }
            )
        return false;
    }

    const removeImage = (dataImage) => {
        let listImage = fileList;
        listImage = listImage.filter((x) => x.uid !== dataImage.uid);
        setFileList(listImage);
    }

    const addKindOfRoom = () => {
        
    }

    return (
        <>
            <div className="font-semibold text-xl">
                Thêm mới loại phòng
            </div>
            <Form name="nest-messages" onFinish={addKindOfRoom} validateMessages={validateMessages}>
                <div className="grid grid-cols-12 gap-28 mt-6">
                    <div className="text-base col-span-4">
                        <div>
                            Tên loại phòng
                            <Form.Item
                                name="Tên loại phòng"
                                rules={[
                                    {   
                                        required: true,

                                    },
                                    validateMessages.space,
                                    validateMessages.specialCharacters,

                                ]}
                                hasFeedback 
                            >
                                <Input
                                    className="mt-1 w-full"
                                    placeholder="Nhập tên loại phòng..."
                                    // prefix={<UserOutlined />}
                                    // value={booking.customerName}
                                    // onChange={
                                    //     (e) => setBooking({
                                    //         ...booking,
                                    //         customerName: e.target.value
                                    //     })
                                    // }
                                />
                            </Form.Item>
                        </div>
                        <div>
                            Giá theo ngày
                            <Form.Item
                                name="Giá theo ngày"
                                rules={[
                                    {   
                                        required: true,

                                    },
                                ]}
                                hasFeedback 
                            >
                                <InputNumber
                                    className="mt-1 w-full"
                                    placeholder="Nhập giá theo ngày..."
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter={"VND"}
                                    // prefix={<UserOutlined />}
                                    // value={booking.customerName}
                                    onChange={
                                        (e) => console.log(e)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div>
                            Giá theo giờ
                            <Form.Item
                                name="Giá theo giờ"
                                rules={[
                                    {   
                                        required: true,

                                    },
                                ]}
                                hasFeedback 
                            >
                                <InputNumber
                                    className="mt-1 w-full"
                                    placeholder="Nhập giá theo ngày..."
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter={"VND"}
                                    // prefix={<UserOutlined />}
                                    // value={booking.customerName}
                                    onChange={
                                        (e) => console.log(e)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div>
                            Ghi chú
                            <Form.Item
                                name="Ghi chú"
                                rules={[
                                    {   
                                        required: true,

                                    },
                                ]}
                            >
                                <TextArea
                                    showCount
                                    maxLength={100}
                                    style={{ height: 120, resize: 'none' }}
                                    className="w-full"
                                    placeholder="Ghi chú..."
                                />
                            </Form.Item>
                        </div>
                        <div className="mt-14">
                            <Switch
                                checkedChildren="Hoạt động"
                                unCheckedChildren="Ngừng hoạt động"
                                defaultChecked
                            />
                        </div>
                    </div>
                    <div className="text-base col-span-8">
                        <div>Ảnh</div>
                        <div className="mt-1">
                            <Upload
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                multiple
                                beforeUpload={uploadImgae}
                                onRemove={removeImage}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal
                                open={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default CreateKindOfRoom;