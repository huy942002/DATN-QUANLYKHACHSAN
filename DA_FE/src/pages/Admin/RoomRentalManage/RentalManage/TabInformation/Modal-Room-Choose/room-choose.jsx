import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function RoomChoose({ room, roomPlan, setRoomPlan, roomChoose, setRoomChoose }) {

    //Data
    // const roomPlanDefault = useSelector((state) => state.roomPlan.roomPlan);
    const [roomPlanDefault, setRoomPlanDefault] = useState();
    //End Data

    //Created
    useEffect(() => {
        getRoomPlan();
    }, [])
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    const getRoomPlan = async () => {
        await axios.get('http://localhost:8080/api/room-rental-manage/get-room-plan/2022-12-15')
                .then(res => {
                    setRoomPlanDefault(res.data);
                }).catch(err => {});
    }
    const removeRoom = (room) => {
        let floor = roomPlanDefault.find((element) => element.numberOfFloors === room.numberOfFloors.numberOfFloors);
        let detailedRoom = floor.listRoom.find((element) => element.rooms.id === room.id);
        setRoomChoose(roomChoose.filter((element) => element.id !== room.id));
        setRoomPlan(
            roomPlan.map((element) => {
                if (element.numberOfFloors === room.numberOfFloors.numberOfFloors) {
                    return {
                        ...element,
                        listRoom: [
                            ...element.listRoom,
                            {
                                rooms: detailedRoom.rooms,
                                detailsInvoice: detailedRoom.detailsInvoice,
                                facilitiesDetailsList: detailedRoom.facilitiesDetailsList,
                                serviceAvailableList: detailedRoom.serviceAvailableList,
                            },
                        ],
                    };
                } else {
                    return element;
                }
            }),
        );
    };
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    return (
        <Card onClick={() => removeRoom(room)} className="hover:border-design-greenLight cursor-pointer">
            <div className='flex items-center'>
                <div className='bg-design-greenLight rounded-full p-2 text-white h-10 w-10 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faBed} ></FontAwesomeIcon>
                </div>
                <div className='ml-3'>
                    <div className='text-lg font-semibold'>{room && room.name}</div>
                    <div className='text-base'>{ room && room.kindOfRoom.name}</div>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                </div>
                <div className='ml-3 text-base'>
                    Giá theo giờ:&nbsp;
                    <span className='font-semibold'>
                        { room && formatCurrency(room.kindOfRoom.hourlyPrice) }
                    </span>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                </div>
                <div className='ml-3 text-base'>
                    Giá theo ngày:&nbsp;
                    <span className='font-semibold'>
                        { room && formatCurrency(room.kindOfRoom.priceByDay) }
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default RoomChoose;
