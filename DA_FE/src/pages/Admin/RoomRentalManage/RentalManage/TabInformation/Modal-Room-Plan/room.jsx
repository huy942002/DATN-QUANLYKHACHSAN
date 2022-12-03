import { MenuUnfoldOutlined } from '@ant-design/icons';
import {
    faArrowLeftRotate,
    faArrowUpFromBracket,
    faBed,
    faBroom,
    faCalendar,
    faCircleCheck,
    faCircleExclamation,
    faClock,
    faInbox,
    faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import { Card, Tooltip } from 'antd';
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

function Room({ room, roomPlan, setRoomPlan, roomChoose, setRoomChoose }) {

    //Data
    //End Data

    //Created
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    const addRoom = (room) => {
        setRoomChoose([...roomChoose, room]);
        setRoomPlan(
            roomPlan.map((element) => ({
                ...element,
                listRoom: element.listRoom.filter((element) => element.rooms.id !== room.id),
            })),
        );
    };
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    return (
        <Card onClick={() => addRoom(room.rooms)} className="hover:border-design-greenLight cursor-pointer">
            <div className='flex items-center'>
                <div className='bg-design-greenLight rounded-full p-2 text-white h-10 w-10 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faBed} ></FontAwesomeIcon>
                </div>
                <div className='ml-3'>
                    <div className='text-lg font-semibold'>{ room.rooms && room.rooms.name}</div>
                    <div className='text-base'>{ room.rooms && room.rooms.kindOfRoom.name}</div>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                </div>
                <div className='ml-3 text-base'>
                    Giá theo giờ:&nbsp;
                    <span className='font-semibold'>
                        { room.rooms && formatCurrency(room.rooms.kindOfRoom.hourlyPrice) }
                    </span>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                </div>
                <div className='ml-3 text-base'>
                    Giá theo ngày:&nbsp;
                    <span className='font-semibold'>
                        { room.rooms && formatCurrency(room.rooms.kindOfRoom.priceByDay) }
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default Room;
