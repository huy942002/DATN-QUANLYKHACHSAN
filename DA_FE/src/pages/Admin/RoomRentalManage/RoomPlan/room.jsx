import { ExclamationCircleFilled } from '@ant-design/icons';
import {
    faArrowUpFromBracket,
    faBed,
    faBroom,
    faCircleExclamation,
    faDollar,
    faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import { Divider, message, Modal, Tooltip } from 'antd';
import axios from 'axios';
import { useState, React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './room.css';

const { confirm } = Modal;

function Room({ room, roomPlan, setRoomPlan }) {

    //Data
    const navigate = useNavigate();
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const dateNow = new Date();
    const [dayRental, setDayRental] = useState();
    const [hourRental, setHourRental] = useState();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const key = 'messageApi';
    const [messageApi, contextHolder] = message.useMessage();
    //End Data

    //Created
    useEffect(() => {
        genDayRental();
        genHourRental();
    })
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
            <div
                className={`h-[230px] rounded-lg cursor-default grid grid-cols-3 grid-rows-5 items-center text-base text-white
                ${room.rooms.status === 1 ? 'bg-status-1' : ''}
                ${room.rooms.status === 2 ? 'bg-status-2' : ''}
                ${room.rooms.status === 3 ? 'bg-status-3' : ''}`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setAnchorPoint({ x: e.clientX, y: e.clientY });
                    toggleMenu(true);
                }}
            >
                {room.rooms && room.rooms.status === 2 ? (
                    <>
                        <div className='col-span-3 h-full grid grid-cols-3 font-semibold'>
                            <div className='w-full h-full flex justify-center items-center text-white'>
                                <div>
                                    <div className='text-xl font-semibold w-full flex justify-center items-center'>{room.rooms.name}</div>
                                    <div className='w-full flex justify-center items-center'>{room.rooms.kindOfRoom.name}</div>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-center items-center text-white'>
                                
                            </div>
                            <div className='w-full h-full flex justify-center items-center text-white'>
                                <div>
                                    <div className='w-full flex justify-center items-center text-xl h-[28px]'>
                                        <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        {room.rooms && room.rooms.status === 1 ? "Phòng trống" : room.rooms.status === 2 ? "Đã có khách" : "Dọn dẹp"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 h-full flex justify-center items-center font-semibold text-xl'>
                            {room.detailsInvoice && room.detailsInvoice.bills.customer.fullname}
                        </div>
                        <div className='col-span-3 h-full flex justify-center items-center row-span-2'>
                            <div className='flex justify-center items-center mr-3'>
                                {/* {room.detailsInvoice && room.detailsInvoice.hireDate} */}
                                <div className='mr-2'>
                                    <div className='border-b-[1px] font-semibold flex items-center justify-center'>{getDayHireDate() ? getDayHireDate().split("-")[2] : ""}</div>
                                    <div className='border-t-[1px] font-semibold flex items-center justify-center'>{getDayHireDate() ? getDayHireDate().split("-")[1] : ""}</div>
                                </div>
                                <div className='text-2xl'>{getTimeHireDate()}</div>
                            </div>
                            <div className='bg-white h-[70px] w-[70px] rounded-full flex justify-center items-center text-black font-semibold'>
                                {room.detailsInvoice && room.detailsInvoice.rentalTypes.id === 1 && (<span>{dayRental} (D)</span>) }
                                {room.detailsInvoice && room.detailsInvoice.rentalTypes.id === 2 && (<span>{hourRental} (H)</span>)}
                            </div>
                            <div className='flex justify-center items-center ml-3'>
                                {/* {room.detailsInvoice && room.detailsInvoice.hireDate} */}
                                <div className='mr-2'>
                                    <div className='border-b-[1px] font-semibold flex items-center justify-center'>{getDayCheckOutDay() ? getDayCheckOutDay().split("-")[2] : ""}</div>
                                    <div className='border-t-[1px] font-semibold flex items-center justify-center'>{getDayCheckOutDay() ? getDayCheckOutDay().split("-")[1] : ""}</div>
                                </div>
                                <div className='text-2xl'>{getTimeCheckOutDay()}</div>
                            </div>
                        </div>
                        <div className='col-span-3 h-full flex justify-center items-center text-xl font-semibold'>
                            <FontAwesomeIcon icon={faDollar} className="mr-2"></FontAwesomeIcon> {formatCurrency(genAllMoneyDetail())}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='col-span-3 row-span-5 grid grid-cols-2 gap-10 font-semibold'>
                            <div className='w-full h-full flex justify-end items-center text-white'>
                                <div>
                                    <div className='text-xl font-semibold w-full flex justify-center items-center'>{room.rooms.name}</div>
                                    <div className='w-full flex justify-center items-center'>{room.rooms.kindOfRoom.name}</div>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-start items-center text-white'>
                                <div>
                                    <div className='w-full flex justify-center items-center text-xl h-[28px]'>
                                        <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        {room.rooms && room.rooms.status === 1 ? "Phòng trống" : room.rooms.status === 2 ? "Đã có khách" : "Đang dọn dẹp"}
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 w-full h-full flex justify-center items-center text-white font-semibold text-xl'>
                                {room.rooms && room.rooms.status === 1 ? "Sẵn sàng đón khách" : "Đang được dọn dẹp"}
                            </div>
                        </div>
                    </>
                )}

                {/** Menu list */}
                <div className="rounded-[2px]">
                    <ControlledMenu
                        {...menuProps}
                        anchorPoint={anchorPoint}
                        onClose={() => toggleMenu(false)}
                        menuClassName="my-menu"
                    >
                        <div className={`${room.rooms.status !== 1 ? 'hidden' : ''}`}>
                            <MenuItem
                                className={`rounded-lg`}
                                onClick={() => {
                                    navigate('/admin/rental-manage' + '/check-in/' + room.rooms.id);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowUpFromBracket}
                                    className="rotate-[180deg] h-4 w-4 mr-2"
                                ></FontAwesomeIcon>
                                Check in
                            </MenuItem>
                        </div>
                        <div className={`${room.rooms.status !== 2 ? 'hidden' : ''}`}>
                            <MenuItem className={`rounded-lg`}>
                                <FontAwesomeIcon
                                    icon={faArrowUpFromBracket}
                                    className="rotate-[90deg] h-4 w-4 mr-2"
                                ></FontAwesomeIcon>
                                Check out
                            </MenuItem>
                        </div>
                        <div onClick={showModal} className={`${room.rooms.status !== 3 ? 'hidden' : ''}`}>
                            <MenuItem className={`rounded-lg`}>
                                <FontAwesomeIcon icon={faBroom} className="mr-2 h-4 w-4"></FontAwesomeIcon>
                                Dọn phòng
                            </MenuItem>
                        </div>
                        <div className={`${room.rooms.status !== 2 ? 'hidden' : ''}`}>
                            <MenuItem
                                onClick={() => {
                                    navigate('/admin/rental-manage' + '/details/' + room.rooms.id );
                                }}
                                className={`rounded-lg`}
                            >
                                <FontAwesomeIcon icon={faCircleExclamation} className="mr-2 h-4 w-4"></FontAwesomeIcon>
                                Chi tiết
                            </MenuItem>
                        </div>
                        <MenuItem className={`rounded-lg`}>
                            <FontAwesomeIcon icon={faRotate} className="mr-2 h-4 w-4"></FontAwesomeIcon>Đổi trạng thái
                        </MenuItem>
                    </ControlledMenu>
                </div>
            </div>
        </>
    );
}

export default Room;
