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
import { Divider, Tooltip } from 'antd';
import { useState, React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './room.css';

function Room({ room }) {

    //Data
    const navigate = useNavigate();
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const dateNow = new Date();
    const [dayRental, setDayRental] = useState();
    const [hourRental, setHourRental] = useState();
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
    //End Gen Data

    //Function
    //End Function

    //Util
    //End Util

    return (
        <div
            className={`h-[200px] rounded-lg cursor-default grid grid-cols-3 grid-rows-4 items-center text-base text-white
            ${room.rooms.status === 1 ? 'bg-status-1' : ''}
            ${room.rooms.status === 2 ? 'bg-status-2' : ''}
            ${room.rooms.status === 3 ? 'bg-status-3' : ''}`}
            onContextMenu={(e) => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                toggleMenu(true);
            }}
        >
            <div className='col-span-3 h-full grid grid-cols-3'>
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
                        <div className='w-full flex justify-center items-center'>Đã có khách</div>
                    </div>
                </div>
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
                <FontAwesomeIcon icon={faDollar}></FontAwesomeIcon>
            </div>
            
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
                                navigate('/admin/check-in-out-details/' + room.rooms.id + '/check-in');
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
                    <div className={`${room.rooms.status !== 3 ? 'hidden' : ''}`}>
                        <MenuItem className={`rounded-lg`}>
                            <FontAwesomeIcon icon={faBroom} className="mr-2 h-4 w-4"></FontAwesomeIcon>
                            Dọn phòng
                        </MenuItem>
                    </div>
                    <div className={`${room.rooms.status !== 2 ? 'hidden' : ''}`}>
                        <MenuItem
                            onClick={() => {
                                navigate('/admin/check-in-out-details/' + room.rooms.id + '/details');
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
    );
}

export default Room;
