import { Divider } from 'antd';
import RoomPlan from './Modal-Room-Plan/room-plan';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RoomChoose from './Modal-Room-Choose/room-choose';

function ContentModalAddRoom({ detailInvoices, roomChoose, setRoomChoose }) {

    //Data
    //End Data

    //Created
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    //End Function

    //Util
    //End Util
    
    const [roomPlan, setRoomPlan] = useState(useSelector((state) => state.roomPlan.roomPlan));
    useEffect(() => {
        if (detailInvoices) {
            detailInvoices.map((element) => {
                setRoomPlan(
                    roomPlan.map((element2) => ({
                        ...element2,
                        listRoom: element2.listRoom.filter((element3) => element3.rooms.id !== element.rooms.id),
                    })),
                );
            });
        }
    }, []);

    return (
        <div className="grid grid-cols-2 gap-6 ">
            <div className="">
                <Divider orientation="left" style={{ margin: '0px', marginBottom: '20px' }}>
                    <div className="text-base font-semibold flex items-center">Danh sách phòng trống</div>
                </Divider>
                <div>
                    <RoomPlan
                        roomPlan={roomPlan}
                        setRoomPlan={setRoomPlan}
                        roomChoose={roomChoose}
                        setRoomChoose={setRoomChoose}
                    ></RoomPlan>
                </div>
            </div>
            <div className="">
                <Divider orientation="left" style={{ margin: '0px', marginBottom: '20px' }}>
                    <div className="text-base font-semibold flex items-center">Phòng chọn</div>
                </Divider>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {roomChoose.map((element) => {
                        return (
                            <RoomChoose
                                room={element}
                                roomPlan={roomPlan}
                                setRoomPlan={setRoomPlan}
                                roomChoose={roomChoose}
                                setRoomChoose={setRoomChoose}
                            ></RoomChoose>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ContentModalAddRoom;
