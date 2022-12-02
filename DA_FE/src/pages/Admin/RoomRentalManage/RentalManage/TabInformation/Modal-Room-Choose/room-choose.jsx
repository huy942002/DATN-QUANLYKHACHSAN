import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import { useSelector } from 'react-redux';

function RoomChoose({ room, roomPlan, setRoomPlan, roomChoose, setRoomChoose }) {

    //Data
    const roomPlanDefault = useSelector((state) => state.roomPlan.roomPlan);
    //End Data

    //Created
    //End Created

    //Gen Data
    //End Gen Data

    //Function
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
        // <div
        //     className={`h-[150px] rounded-[2px] cursor-default grid grid-cols-3 grid-rows-2 items-center text-base text-white
        //         ${room.status === 1 ? 'bg-status-1' : ''}
        //         ${room.status === 2 ? 'bg-status-2' : ''}
        //         ${room.status === 3 ? 'bg-status-3' : ''}`}
        //     onClick={() => {
        //         removeRoom(room);
        //     }}
        // >
        //     <div className="w-full h-full p-4">
        //         <div
        //             className={`rounded-[2px] h-full w-full flex items-center justify-center font-semibold
        //                 ${room.status === 1 ? 'bg-status-1.5' : ''}
        //                 ${room.status === 2 ? 'bg-status-2.5' : ''}
        //                 ${room.status === 3 ? 'bg-status-3.5' : ''}`}
        //         >
        //             {room.name}
        //         </div>
        //     </div>
        //     <div className="w-full h-full p-4 pl-0 col-span-2">
        //         <div
        //             className={`rounded-[2px] h-full w-full flex items-center justify-center font-semibold
        //                 ${room.status === 1 ? 'bg-status-1.5' : ''}
        //                 ${room.status === 2 ? 'bg-status-2.5' : ''}
        //                 ${room.status === 3 ? 'bg-status-3.5' : ''}`}
        //         >
        //             {room.kindOfRoom.name}
        //         </div>
        //     </div>
        // </div>
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
