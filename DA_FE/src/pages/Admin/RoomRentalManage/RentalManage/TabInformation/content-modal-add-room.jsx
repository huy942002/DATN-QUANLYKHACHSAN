import { Divider } from 'antd';
import RoomPlan from './Modal-Room-Plan/room-plan';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RoomChoose from './Modal-Room-Choose/room-choose';
import axios from 'axios';

function ContentModalAddRoom({ detailInvoices, roomChoose, setRoomChoose }) {

    //Data
    const [roomPlan, setRoomPlan] = useState();
    //End Data

    //Created
    useEffect(() => {
        getRoomPlan();
    }, []);
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    const getRoomPlan = async () => {
        await axios.get('http://localhost:8080/api/room-rental-manage/get-room-plan/2022-12-15')
                .then(res => {
                    if (detailInvoices) {
                        detailInvoices.map((element) => {
                            setRoomPlan(
                                res.data.map((element2) => ({
                                    ...element2,
                                    listRoom: element2.listRoom.filter((element3) => element3.rooms.id !== element.rooms.id),
                                })),
                            );
                        });
                    }
                }).catch(err => {});
    }
    //End Function

    //Util
    //End Util

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
