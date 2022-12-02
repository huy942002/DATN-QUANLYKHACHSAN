import { Button, DatePicker, Divider, Input, Select } from 'antd';
import { AuditOutlined, GoogleOutlined, HomeOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getBillListIsActive } from '~/app/reducers/SystemManagement/system-management-api';
import { type } from '@testing-library/user-event/dist/type';

const genders = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
];
const customerType = [
    { value: 'New', label: 'Mới' },
    { value: 'Using', label: 'Đang sử dụng' },
];
function CustomerInformation({ customer, setCustomer, type, setBill }) {

    //Data
    const dispatch = new useDispatch();
    const [customerTypeSelected, setCustomerTypeSelected] = useState('New');
    const nationalities = useSelector((state) => state.nationality.nationalities);
    const billListIsActive = useSelector((state) => state.systemManagement.billList);
    //End Data

    //Created
    useEffect(() => {
        getBillListIsActive(dispatch);
        setCustomer({ ...customer, nationality: nationalities[0] });
    }, []);
    //End Created

    //Gen Data
    const genNationality = () => {
        const array = [];
        nationalities.forEach((element) => {
            array.push({ value: element.id, label: element.name });
        });
        return array;
    };
    const genBillListIsActive = () => {
        const array = [];
        billListIsActive.forEach((element) => {
            array.push({ value: element.id, label: element.customer.fullname + ' - ' + element.customer.phoneNumber });
        });
        return array;
    };
    //End Gen Data

    //Function
    const changeCustomer = (value) => {
        setCustomer(billListIsActive.find((element) => element.id === value).customer);
        setBill(billListIsActive.find((element) => element.id === value));
    };
    const changeFullName = (value) => {
        setCustomer({ ...customer, fullname: value });
    };
    //End Function

    //Util
    //End Util

    return (
        <div className="">
            <Divider orientation="left">
                <div className="flex justify-center items-center">
                    <div className="text-base font-semibold mr-3">Thông tin</div>
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
                        options={genBillListIsActive()}
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
                                nationality: nationalities.find((element) => element.id === e),
                            });
                        }}
                        className="w-full mt-[2px]"
                        value={
                            customer.nationality
                                ? genNationality().find((element) => element.value === customer.nationality.id).value
                                : genNationality()[0].value
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
        </div>
    );
}

export default CustomerInformation;
