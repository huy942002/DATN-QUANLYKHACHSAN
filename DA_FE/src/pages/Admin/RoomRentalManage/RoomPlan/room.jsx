 import { DownOutlined, ExclamationCircleFilled, SmileOutlined } from '@ant-design/icons';
import {
    faArrowUpFromBracket,
    faBed,
    faBroom,
    faBuildingCircleCheck,
    faCircleExclamation,
    faDollar,
    faDoorClosed,
    faDoorOpen,
    faMoneyCheckDollar,
    faPersonWalkingArrowRight,
    faPersonWalkingLuggage,
    faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import { Divider, Dropdown, message, Modal, Tooltip, Space, Button } from 'antd';
import axios from 'axios';
import { useState, React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MonthlyCalendarRoom from '../Calendar/MonthlyCalendar';
import './room.css';

const { confirm } = Modal;


function Room({ room, roomPlan, setRoomPlan, dateChoose }) {

    //Data
    const navigate = useNavigate();
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const dateNow = new Date();
    const [dayRental, setDayRental] = useState();
    const [hourRental, setHourRental] = useState();
    const [open, setOpen] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const key = 'messageApi';
    const [messageApi, contextHolder] = message.useMessage();
    // const [status, getStatus] = useState(room.rooms.statusByDate);
    const [detailInvoice, setDetailInvoice] = useState(room.detailInvoiceList.find(element => element.status === 1));
    const [booking, setBooking] = useState(room.detailInvoiceList.find(element => element.status === 3));
    const items = [
        {
          key: '1',
          label: (
            <div className={`w-full`} onClick={() => {
                if(room.rooms.statusByDate === 1) {
                    setOpenCalendar(true)
                }
            }}>Check in</div>
            // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            //   1st menu item
            // </a>
          ),
          disabled: room.rooms.statusByDate === 2,
        },
        {
          key: '2',
          label: (
            <div className='w-full' onClick={() => {
                if(room.rooms.statusByDate === 2) {
                    navigate('/admin/rental-manage' + '/details/' + room.rooms.id);
                }
            }}>Chi tiết hóa đơn</div>
          ),
          disabled: room.rooms.statusByDate !== 2,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
    ];
    const [inOut, setInOut] = useState({
        hireDate: "",
        checkOutDay: "",
    });
    //End Data

    //Created
    useEffect(() => {
        genDayRental();
        genHourRental();
    })
    useEffect(() => {
        setDetailInvoice(room.detailInvoiceList.find(element => element.status === 1));
        setBooking(room.detailInvoiceList.find(element => element.status === 3));
    }, [roomPlan])
    //End Created

    //Gen Data
    const genDayRental = () => {
        if(room.detailsInvoice) {
            let d1 = dateNow.getTime();
            let d2 = new Date(room.detailsInvoice.hireDate).getTime();
            setDayRental(Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000)));
        }
    };

    const genHourRental = () => {
        if(room.detailsInvoice) {
            let d1 = dateNow.getTime();
            let d2 = new Date(room.detailsInvoice.hireDate).getTime();
            setHourRental(Math.ceil((d1 - d2) / (60 * 60 * 1000)));
        }
    };

    const getDayHireDate = () => {
        if(room.detailsInvoice && room.detailsInvoice.hireDate){
            return room.detailsInvoice.hireDate.toString().split(" ")[0];
        }
    }
    const getTimeHireDate = () => {
        if(room.detailsInvoice && room.detailsInvoice.hireDate){
            return room.detailsInvoice.hireDate.toString().split(" ")[1];
        }
    }
    const getDayCheckOutDay = () => {
        if(room.detailsInvoice && room.detailsInvoice.checkOutDay){
            return room.detailsInvoice.checkOutDay.toString().split(" ")[0];
        }
    }
    const getTimeCheckOutDay = () => {
        if(room.detailsInvoice && room.detailsInvoice.checkOutDay){
            return room.detailsInvoice.checkOutDay.toString().split(" ")[1];
        }
    }
    const genAllMoneyDetail = () => {
        let allMoney = 0;
        if(room.detailsInvoice && dayRental && hourRental){

            let allMoneyRoom = room.detailsInvoice.rentalTypes.name === "Theo ngày" ? room.rooms.kindOfRoom.priceByDay * dayRental : room.rooms.kindOfRoom.hourlyPrice * hourRental;
            
            let surcharge = 0;
            let d1 = dateNow.getTime();
            let d2 = new Date(room.detailsInvoice.checkOutDay).getTime();
            if(room.detailsInvoice.rentalTypes.name === "Theo ngày") {
                if(d1 > d2) {
                    surcharge = allMoneyRoom * 10 / 100;
                }
            }

            let allMoneyService = 0;
            room.serviceDetailsList.forEach(element => {
                allMoneyService += element.quantity * element.servicess.prices;
            })

            allMoney = allMoneyRoom + surcharge + allMoneyService;
        }
        return allMoney;
    }
    //End Gen Data

    //Function
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        clearTheRoom(room.rooms.id);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const clearTheRoom = async (idRoom) =>  {
        setConfirmLoading(true);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Vui lòng chờ...',
        });
        await axios.put('http://localhost:8080/api/room-rental-manage/clear-the-room/' + idRoom)
                .then(res => { 
                    if(res) {
                        setTimeout(() => {
                            setConfirmLoading(false);
                            setOpen(false);
                            messageApi.open({
                                key,
                                type: 'success',
                                content: 'Dọn phòng thành công!',
                                duration: 2,
                            });
                            setRoomPlan(roomPlan.map(element => {
                                return {...element, listRoom: element.listRoom.map(element2 => {
                                    if(element2.rooms.id === idRoom){
                                        return {...element2, rooms: {...element2.rooms, status: 1}};
                                    } else {
                                        return element2;
                                    }
                                })};
                            }))
                        }, 1000);
                    }
                }).catch(err => {
                    setTimeout(() => {
                        setConfirmLoading(false);
                        setOpen(false);
                        messageApi.open({
                            key,
                            type: 'error',
                            content: 'Lỗi, vui lòng kiểm tra lại!',
                            duration: 2,
                        });
                    }, 1000);
                });
    }
    const checkIn = () => {
        if(inOut.hireDate && inOut.checkOutDay) {
            navigate('/admin/rental-manage' + '/check-in/' + room.rooms.id + "/" + inOut.hireDate + "/" + inOut.checkOutDay);
        }
    }
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    return (
        <> 
            {contextHolder}
            <Modal
                title={<span><ExclamationCircleFilled className='text-yellow-400 mr-3'/>Xác nhận phòng đã được dọn!</span>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>Bạn chắc chắn phòng đã được dọn rồi chứ?</p>
            </Modal>
            <div className=' border border-1 text-base p-3 cursor-pointer hover:bg-default-2 hover:border-design-greenLight'>
                <div className='flex justify-end font-semibold'>
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <span className='text-base font-semibold'>{room.rooms.name}</span>
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </div>
                <div className='flex justify-end font-semibold'>
                    {room.rooms.kindOfRoom.name}
                </div>
                <div className={`flex items-center pt-10`}>
                    <span className={`px-3 py-1 rounded-full text-white
                    ${room.rooms.statusByDate === 1 ? "bg-design-greenLight" : ""}
                    ${room.rooms.statusByDate === 2 ? "bg-status-2" : ""}
                    ${room.rooms.statusByDate === 3 ? "bg-status-3" : ""}
                    `}>
                        {room.rooms.statusByDate === 1 && "Sẵn sàng đón khách"}
                        {room.rooms.statusByDate === 2 && "Đang có khách"}
                        {room.rooms.statusByDate === 3 && "Đang dọn dẹp"}
                    </span>
                    <span className='ml-3'>{detailInvoice && detailInvoice.bills.customer.fullname}</span>
                </div>
                {detailInvoice && (
                    <>
                        <div className='grid grid-cols-2 pt-3'>
                            <div className='flex items-center'>
                                <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                                </span>
                                <span className='ml-3'>
                                    {detailInvoice && detailInvoice.hireDate}
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faBuildingCircleCheck} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                                </span>
                                <span className='ml-3'>
                                    {detailInvoice && detailInvoice.checkOutDay}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center mt-3'>
                            <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faMoneyCheckDollar} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                            </span>
                            <span className='ml-3 text-red-500 font-semibold'>
                                {formatCurrency(genAllMoneyDetail())}
                            </span>
                        </div>
                    </>
                )}
                {booking && (
                    <>
                        <Divider style={{margin: 12}}/>
                        <div className={`flex items-center w-full`}>
                            <span className={`px-3 py-1 rounded-full text-white bg-status-4`}>
                                Khách đặt trước
                            </span>
                            <span className='ml-3'>{booking && booking.bills.customer.fullname}</span> 
                        </div>
                        <div className='flex items-center mt-3'>
                            <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faPersonWalkingLuggage} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                            </span>
                            <span className='ml-3'>
                                {booking && booking.hireDate}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <Modal
                title={room.rooms.name}
                centered
                open={openCalendar}
                onOk={() => checkIn()}
                onCancel={() => setOpenCalendar(false)}
                okText="Xác nhận"
                cancelText="Hủy"
                width={1800}
            >   
                <MonthlyCalendarRoom roomId={room.rooms.id} inOut={inOut} setInOut={setInOut} dateChoose={dateChoose}></MonthlyCalendarRoom>
            </Modal>
        </>
    );
}

export default Room;
