import { DatePicker, Tabs, Button, message, Space, Drawer, Radio, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Personnel from '~/models/Personnel/Personnel';
import Customer from '~/models/Customer/Customer';
import DetailInvoice from '~/models/DetailInvoice/DetailInvoice';
import RoomServices from './TabService/room-services';
import Services from './TabService/services';
import Bill from '~/models/Bill/Bill';
import axios from 'axios';
import { StepBackwardOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import CustomerInformation from './TabInformation/customer-information';
import ListRoom from './TabInformation/list-room';
import dayjs  from 'dayjs';
import CheckInInformation from './TabInformation/check-in-information';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const timeCheckInOut = {
    id: 1,
    timeCheckIn: '12:00',
    timeCheckOut: '12:00',
};

const RentalManage = () => {

    //Data
    const navigate = new useNavigate();
    const key = 'messageApi';
    const [messageApi, contextHolder] = message.useMessage();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { idRoomChoose, type } = useParams();

    const dateNow = new Date();
    const dateTomorrow = new Date().setDate(dateNow.getDate() + 1);
    const [roomPlan, setRoomPlan] = useState();
    const [rentalTypes, setRentalTypes] = useState();
    const [nationalityList, setNationalityList] = useState();
    const [billActiveList, setBillActiveList] = useState();

    const [personnel, setPersonnel] = useState(new Personnel());
    const [bill, setBill] = useState(new Bill());
    const [customer, setCustomer] = useState(new Customer());
    const [detailInvoices, setDetailInvoices] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);
    //End Data

    //Created
    useEffect(() => {
        window.scrollTo(0, 0);
        getRoomPlan();
        getAllRentalType();
        getAllNationality();
        getAllBillActive();
        if (type === 'details') {
            checkData();
        }
    }, []);
    useEffect(() => {
        if(roomPlan && rentalTypes) {
            if(type === "check-in") {
                addRoomDetail();
                setBill({ ...bill, personnel: personnel });
            }
        }
    }, [roomPlan, rentalTypes])
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    const getRoomPlan = async () => {
        await axios.get('http://localhost:8080/api/room-rental-manage/get-room-plan')
                .then(res => {
                    setRoomPlan(res.data);
                }).catch(err => {});
    }
    const getAllRentalType = async () => {
        await axios.get('http://localhost:8080/api/rental-type')
                .then(res => {
                    setRentalTypes(res.data);
                }).catch(err => {});
    }
    const getAllNationality = async () => {
        await axios.get('http://localhost:8080/api/nationality')
                .then(res => {
                    setNationalityList(res.data);
                }).catch(err => {});
    }
    const getAllBillActive = async () => {
        await axios.get('http://localhost:8080/api/room-rental-manage/all-bill-active')
                .then(res => {
                    setBillActiveList(res.data);
                }).catch(err => {});
    }
    //End Function

    //Util
    //End Util
    // const roomPlan = useSelector((state) => state.roomPlan.roomPlan);
    // const rentalTypes = useSelector((state) => state.rentalType.rentalTypes);
    
    
    const addRoomDetail = () => {
        //Add room
        if (detailInvoices.length === 0) {
            const newDetailInvoice = new DetailInvoice();
            newDetailInvoice.rooms = getRoomChoose().rooms;
            newDetailInvoice.facilitiesDetailsList = getRoomChoose().facilitiesDetailsList;
            newDetailInvoice.serviceAvailableList = getRoomChoose().serviceAvailableList;
            newDetailInvoice.key = getRoomChoose().rooms.id;
            newDetailInvoice.hireDate = dayjs(dateNow).format('YYYY-MM-DD') + " 12:00";
            newDetailInvoice.checkOutDay = dayjs(dateTomorrow).format('YYYY-MM-DD') + " 12:00";
            newDetailInvoice.rentalTypes = rentalTypes[0];
            return setDetailInvoices([...detailInvoices, newDetailInvoice]);
        }
    };

    const checkData = async () => {
        const response = await axios.get('http://localhost:8080/api/room-rental-manage/details/' + idRoomChoose);
        setDetailInvoices(
            response.data.detailsInvoiceList
        );
        // //Set Detail Invoice
        // const detailInvoicesResponse = response.data.detailsInvoiceList;
        // detailInvoicesResponse.facilitiesDetailsList = getRoomChoose().facilitiesDetailsList;
        // detailInvoicesResponse.serviceAvailableList = getRoomChoose().serviceAvailableList;
        // detailInvoicesResponse.key = getRoomChoose().rooms.id;
        // detailInvoicesResponse.hireDate =
        //     detailInvoicesResponse.hireDate.split('T')[0] + ' ' + detailInvoicesResponse.hireDate.split('T')[1];
        // detailInvoicesResponse.checkOutDay =
        //     detailInvoicesResponse.checkOutDay.split('T')[0] + ' ' + detailInvoicesResponse.checkOutDay.split('T')[1];
        // setDetailInvoices([...detailInvoices, detailInvoicesResponse]);
        //Set Service Detail
        setServiceDetails(response.data.serviceDetailsList);
        // //Set Customer
        setCustomer(response.data.bills.customer);
        setBill(response.data.bills);
    };

    const getRoomByRoomPlan = (idRoom) => {
        let room = null;
        if(roomPlan) {
            roomPlan.forEach((element) => {
                element.listRoom.forEach((element) => {
                    if (element.rooms.id === Number(idRoom)) {
                        room = element;
                    }
                });
            });
        }
        return room;
    };

    const getRoomChoose = () => {
        let roomChoose = null;
        if(roomPlan) {
            roomPlan.forEach((element) => {
                element.listRoom.forEach((element) => {
                    if (element.rooms.id === Number(idRoomChoose)) {
                        roomChoose = element;
                    }
                });
            });
        }
        return roomChoose;
    };

    const triggerAction = async () => {
        console.log(customer);
        console.log(bill);
        console.log(detailInvoices);
        console.log(serviceDetails);
        setConfirmLoading(true);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Vui lòng chờ...',
        });
        if (type === 'check-in') {
            await axios.post('http://localhost:8080/api/room-rental-manage/check-in', {
                customer: customer,
                bill: bill,
                detailInvoices: detailInvoices,
                serviceDetails: serviceDetails,
            }).then(res => {
                if(res) {
                    setTimeout(() => {
                        setConfirmLoading(false);
                        messageApi.open({
                            key,
                            type: 'success',
                            content: 'Check in thành công!',
                            duration: 2,
                        });
                        navigate('/admin/room-plan');
                    }, 1000);
                }
            }).catch(err => {
                setTimeout(() => {
                    setConfirmLoading(false);
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Lỗi, vui lòng kiểm tra lại!',
                        duration: 2,
                    });
                }, 1000);
            }).finally(() => {
                
            });
        }
        if (type === 'details') {
            const response = await axios.post('http://localhost:8080/api/room-rental-manage/update-detail', {
                detailInvoices: detailInvoices,
                serviceDetails: serviceDetails,
            }).then(res => {
                if(res) {
                    setTimeout(() => {
                        setConfirmLoading(false);
                        messageApi.open({
                            key,
                            type: 'success',
                            content: 'Cập nhật thành công!',
                            duration: 2,
                        });
                    }, 1000);
                }
            }).catch(err => {
                setTimeout(() => {
                    setConfirmLoading(false);
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Lỗi, vui lòng kiểm tra lại!',
                        duration: 2,
                    });
                }, 1000);
            }).finally(() => {
                
            });
        }
    };

    return (
        <>
            { contextHolder }
            <div>
                <div className="text-lg font-semibold mb-3">
                    { type === "check-in" && <span>Check in - { getRoomChoose() && getRoomChoose().rooms.name }</span> }
                    { type === "details" && <span>Chi tiết thuê phòng - Khách hàng: { bill.customer ? bill.customer.fullname : "" }</span> }
                </div>
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Thông tin" key="1" className="grid grid-cols-12 gap-12 text-base">
                        <div className='col-span-5'>
                            <CustomerInformation
                                customer={customer}
                                setCustomer={setCustomer}
                                type={type}
                                setBill={setBill}
                                nationalityList={nationalityList}
                                billActiveList={billActiveList}
                            ></CustomerInformation>
                        </div>
                        <div className='col-span-7'>
                            <CheckInInformation
                                bill={bill}
                                setBill={setBill}
                                detailInvoices={detailInvoices}
                                serviceDetails={serviceDetails}
                                type={type}
                                open={open}
                                setOpen={setOpen}
                                dateNow={dateNow}
                                rentalTypeList={rentalTypes}
                            ></CheckInInformation>
                        </div>
                    </TabPane>
                    <TabPane tab="Phòng" key="3" className="grid grid-cols-2 gap-12 text-base">
                        <ListRoom
                            detailInvoices={detailInvoices}
                            setDetailInvoices={setDetailInvoices}
                            serviceDetails={serviceDetails}
                            setServiceDetails={setServiceDetails}
                            bill={bill}
                            rentalTypeList={rentalTypes}
                            dateNow={dateNow}
                            dateTomorrow={dateTomorrow}
                        ></ListRoom>
                    </TabPane>
                    <TabPane tab="Dịch vụ" key="2" className="grid grid-cols-2 gap-12 text-base">
                        <RoomServices
                            detailInvoices={detailInvoices}
                            setDetailInvoices={setDetailInvoices}
                            serviceDetails={serviceDetails}
                            setServiceDetails={setServiceDetails}
                        ></RoomServices>
                        <Services
                            detailInvoices={detailInvoices}
                            serviceDetails={serviceDetails}
                            setServiceDetails={setServiceDetails}
                        ></Services>
                    </TabPane>
                </Tabs>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setOpen(true)} className="mr-3">
                       Thanh toán
                    </Button>
                    <Button onClick={() => triggerAction()} loading={confirmLoading}>
                        {type === "check-in" && <span>Check in</span>}
                        {type === "details" && <span>Lưu</span>}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default RentalManage;
