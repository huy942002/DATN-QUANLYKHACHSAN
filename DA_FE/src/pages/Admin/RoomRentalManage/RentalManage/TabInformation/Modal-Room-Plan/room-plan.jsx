import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import HotelFloor from './hotel-floor';

const RoomPlan = ({ roomPlan, setRoomPlan, roomChoose, setRoomChoose }) => {

    //Data
    const [queryFloor, setQueryFloor] = useState("ALL");
    const [queryKindOfRoom, setQueryKindOfRoom] = useState("ALL");
    const [queryName, setQueryName] = useState('');
    const [kindOfRoomList, setKindOfRoomList] = useState();
    //End Data

    //Created
    useEffect(() => {
        getAllKindOfRoom();
    }, []);
    //End Created

    //Gen Data
    const filterRoomPlan = () => {
        let filter = [];
        if(roomPlan) {
            filter = roomPlan;
            if (queryFloor !== 'ALL') {
                filter = roomPlan.filter((element) => element.numberOfFloors === queryFloor);
            }
            filter = filter.map((element) => {
                return {
                    ...element,
                    listRoom: element.listRoom.filter((element2) => element2.rooms.status === 1),
                };
            });
            if (queryKindOfRoom !== 'ALL') {
                filter = filter.map((element) => {
                    return {
                        ...element,
                        listRoom: element.listRoom.filter((element2) => element2.rooms.kindOfRoom.id === queryKindOfRoom),
                    };
                });
            }
            if (queryName !== '') {
                filter = filter.map((element) => {
                    return {
                        ...element,
                        listRoom: element.listRoom.filter((element2) =>
                            element2.rooms.name
                                .toLowerCase()
                                .replace(/\s+/g, '')
                                .includes(queryName.toLowerCase().replace(/\s+/g, '')),
                        ),
                    };
                });
            }
        }
        return filter;
    };
    const genOptionsFloor = () => {
        const array = [{ value: 'ALL', label: 'ALL' }];
        if(roomPlan) {
            roomPlan.forEach((element) => {
                array.push({ value: element.numberOfFloors, label: 'Tầng ' + element.numberOfFloors });
            });
        }
        return array;
    };
    const genOptionsKindOfRoom = () => {
        const array = [{ value: 'ALL', label: 'ALL' }];
        if(kindOfRoomList) {
            kindOfRoomList.forEach((element) => {
                array.push({ value: element.id, label: element.name });
            });
        }
        return array;
    };
    //End Gen Data

    //Function
    const getAllKindOfRoom = async () => {
        await axios.get('http://localhost:8080/api/kind-of-room')
                .then(res => {
                    setKindOfRoomList(res.data);
                }).catch(err => {});
    }
    //End Function

    //Util
    //End Util

    return (
        <div className="w-full">
            <div className="text-base flex gap-6 mb-6">
                <div className="flex items-center">
                    <div className="mr-2 font-semibold">Tầng: </div>
                    <Select
                        defaultValue={genOptionsFloor()[0].value}
                        style={{
                            width: 100,
                        }}
                        options={genOptionsFloor()}
                        onChange={(value) => {
                            setQueryFloor(value);
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <div className="mr-2 font-semibold">Loại Phòng: </div>
                    <Select
                        defaultValue={genOptionsKindOfRoom()[0].value}
                        style={{ width: 150 }}
                        options={genOptionsKindOfRoom()}
                        onChange={(value) => {
                            setQueryKindOfRoom(value);
                        }}
                        className="font-semibold"
                    />
                </div>
                <div className="flex items-center">
                    <Input
                        value={queryName}
                        onChange={(e) => {
                            setQueryName(e.target.value.toUpperCase());
                        }}
                        style={{ width: 180 }}
                        className="font-semibold"
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                    />
                </div>
                <div
                    onClick={() => {
                        setQueryFloor('ALL');
                        setQueryKindOfRoom('ALL');
                        setQueryName('');
                    }}
                >
                    <div className={`flex items-center cursor-pointer rounded-lg hover:bg-default-1`}>
                        <div className="h-8 w-8 text-white bg-default-3 flex items-center justify-center rounded-lg">
                            <ReloadOutlined />
                        </div>
                        <div className="mx-4">Reload</div>
                    </div>
                </div>
            </div>
            {filterRoomPlan().map((element, index) => {
                return (
                    <HotelFloor
                        key={index}
                        theRoomsOfTheFloor={element}
                        roomPlan={roomPlan}
                        setRoomPlan={setRoomPlan}
                        roomChoose={roomChoose}
                        setRoomChoose={setRoomChoose}
                    ></HotelFloor>
                );
            })}
        </div>
    );
};

export default RoomPlan;
