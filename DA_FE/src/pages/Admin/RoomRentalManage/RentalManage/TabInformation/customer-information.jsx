import { Button, DatePicker, Divider, Input, InputNumber, message, Modal, Select } from 'antd';
import { AuditOutlined, GoogleOutlined, HomeOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { getBillListIsActive } from '~/app/reducers/SystemManagement/system-management-api';

const genders = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
];
const customerType = [
    { value: 'New', label: 'Mới' },
    { value: 'Using', label: 'Đang sử dụng' },
];
function CustomerInformation({ customer, setCustomer, type, bill, setBill, nationalityList, billActiveList }) {

    //Data
    const [customerTypeSelected, setCustomerTypeSelected] = useState('New');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const key = 'messageApi';
    const [messageApi, contextHolder] = message.useMessage();
    //End Data

    //Created
    useEffect(() => {
        // getBillListIsActive(dispatch);
        if(nationalityList) {
            setCustomer({ ...customer, nationality: nationalityList[0] });
        }
    }, [nationalityList]);
    //End Created

    //Gen Data
    const genNationality = () => {
        const array = [];
        if(nationalityList) {
            nationalityList.forEach((element) => {
                array.push({ value: element.id, label: element.name });
            });
        }
        return array;
    };
    const genBillListIsActive = () => {
        const array = [];
        if(billActiveList) {
            billActiveList.forEach((element) => {
                array.push({ value: element.id, label: element.customer.fullname + ' - ' + element.customer.phoneNumber });
            });
        }
        return array;
    };
    //End Gen Data

    //Function
    
    const changeCustomer = (value) => {
        if(billActiveList) {
            setCustomer(billActiveList.find((element) => element.id === value).customer);
            setBill(billActiveList.find((element) => element.id === value));
        }
    };
    const changeFullName = (value) => {
        setCustomer({ ...customer, fullname: value });
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {

    };

    const handleCancel = () => {
        setOpen(false);
    };
    //End Function

    //Util
    //End Util


    const [result, setResult] = useState('No result');
  let handleScan = (data) => {
    if (data) {
      setResult(data);
      console.log(data);
    }
  };

  let handleError = (err) => {
    alert(err);
  };

    return (
        <>
            <Modal
                title="QR"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                {/* {open && (
                    <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    facingMode="environment"
                >{result}</QrReader>
                )} */}
            </Modal>
            <div className="">
                <Divider orientation="left">
                    <div className="flex justify-center items-center">
                        <div className="text-base font-semibold mr-3">Thông tin khách hàng</div>
                        {type !== "details" && (
                            <Select
                                className="w-36"
                                onChange={(e) => {
                                    setCustomerTypeSelected(e);
                                }}
                                options={customerType}
                                value={customerTypeSelected}
                            />
                        )}
                        <Button className='ml-3' onClick={showModal}>QR</Button>
                    </div>
                </Divider>
                <div className="grid grid-cols-2 gap-6 items-center">
                    <div>
                        <div>Họ tên khách hàng:</div>
                        {customerTypeSelected === 'New' && (
                            <Input
                                onChange={(e) => {
                                    changeFullName(e.target.value);
                                }}
                                className={`mt-[2px]`}
                                placeholder="Name..."
                                prefix={<UserOutlined />}
                                value={customer.fullname}
                                disabled={type === "details"}
                            />
                        )}
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            className={`mt-[2px] w-full ${customerTypeSelected === 'Using' ? '' : 'hidden'}`}
                            onChange={changeCustomer}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={billActiveList ? genBillListIsActive() : ""}
                        />
                    </div>
                    <div>
                        <div>Ngày sinh:</div>
                        <DatePicker
                            onChange={(date, dateString) => {
                                var newdate = dateString.split('-').reverse().join('-');
                                setCustomer({
                                    ...customer,
                                    dateOfBirth: dateString === '' ? '' : new Date(Date.parse(newdate)),
                                });
                            }}
                            className="w-full mt-[2px]"
                            format="DD-MM-YYYY"
                            value={customer.dateOfBirth ? dayjs(customer.dateOfBirth) : ''}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Giới tính:</div>
                        <Select
                            onChange={(e) => {
                                setCustomer({ ...customer, gender: e });
                            }}
                            className="w-full mt-[2px]"
                            value={genders.find((element) => element.value === customer.gender)}
                            options={genders}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Quốc tịch:</div>
                        <Select
                            onChange={(e) => {
                                setCustomer({
                                    ...customer,
                                    nationality: nationalityList.find((element) => element.id === e),
                                });
                            }}
                            className="w-full mt-[2px]"
                            value={
                                customer.nationality && nationalityList ? genNationality().find((element) => element.value === customer.nationality.id).value
                                : nationalityList ? genNationality()[0].value
                                : ""
                            }
                            options={genNationality()}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Điện thoại:</div>
                        <Input
                            onChange={(e) => {
                                setCustomer({ ...customer, phoneNumber: e.target.value });
                            }}
                            className="mt-[2px]"
                            placeholder="Phone..."
                            prefix={<PhoneOutlined />}
                            value={customer.phoneNumber || ''}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Email:</div>
                        <Input
                            onChange={(e) => {
                                setCustomer({ ...customer, email: e.target.value });
                            }}
                            className="mt-[2px]"
                            placeholder="Email..."
                            prefix={<GoogleOutlined />}
                            value={customer.email || ''}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Giấy tờ tùy thân:</div>
                        <Input
                            onChange={(e) => {
                                setCustomer({ ...customer, citizenIdCode: e.target.value });
                            }}
                            className="mt-[2px]"
                            placeholder="Identification..."
                            prefix={<AuditOutlined />}
                            value={customer.citizenIdCode || ''}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Địa chỉ:</div>
                        <Input
                            onChange={(e) => {
                                setCustomer({ ...customer, address: e.target.value });
                            }}
                            className="mt-[2px]"
                            placeholder="Adress..."
                            prefix={<HomeOutlined />}
                            value={customer.address || ''}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                </div>
                <Divider orientation="left" style={{paddingTop: 12}}>
                    <div className="flex justify-center items-center">
                        <div className="text-base font-semibold mr-3">Thông tin khác</div>
                    </div>
                </Divider>
                <div className="grid grid-cols-2 gap-6 items-center">
                    <div>
                        <div>Số người lớn:</div>
                        <InputNumber
                            onChange={(e) => {
                                setBill({ ...bill, numberOfAdults: e });
                            }}
                            className="mt-[2px] w-full"
                            placeholder="Number Of Adults..."
                            prefix={<UserOutlined />}
                            value={bill.numberOfAdults || 0}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Số trẻ em:</div>
                        <InputNumber
                            onChange={(e) => {
                                setBill({ ...bill, numberOfKids: e });
                            }}
                            className="mt-[2px] w-full"
                            placeholder="Number Of Kids..."
                            prefix={<UserOutlined />}
                            value={bill.numberOfKids || 0}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                        />
                    </div>
                    <div>
                        <div>Đặt cọc:</div>
                        <InputNumber
                            onChange={(e) => {
                                setBill({ ...bill, deposits: e });
                            }}
                            className="mt-[2px] w-full"
                            placeholder="Deposits..."
                            prefix={<AuditOutlined />}
                            value={bill.deposits || 0}
                            disabled={customerTypeSelected === 'Using' || type === "details"}
                            addonAfter="VND"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerInformation;
