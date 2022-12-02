import { CheckOutlined, FontColorsOutlined, ReloadOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllKindOfRoom } from '~/app/reducers/KindOfRoom/kind-of-room-api';
import { getAllRoomPlan } from '~/app/reducers/RoomPlan/room-plan-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import HotelFloor from './hotel-floor';
import { getAllNationality } from '~/app/reducers/Nationality/nationality-api';
import { getAllRentalType } from '~/app/reducers/RentalType/rental-type-api';
import { getAllServiceByServiceType } from '~/app/reducers/ServiceByServiceType/service-by-service-type-api';
import { getAllServiceType } from '~/app/reducers/ServiceType/service-type-api';

const RoomPlan = ({ roomPlan, setRoomPlan, roomChoose, setRoomChoose }) => {

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

    const dispatch = new useDispatch();
    useEffect(() => {
        getAllRoomPlan(dispatch);
        getAllKindOfRoom(dispatch);
        getAllNationality(dispatch);
        getAllRentalType(dispatch);
        getAllServiceByServiceType(dispatch);
        getAllServiceType(dispatch);
    }, []);

    const kindOfRooms = useSelector((state) => state.kindOfRoom.kindOfRooms);
    const genOptionsFloor = () => {
        const array = [{ value: 'ALL', label: 'ALL' }];
        roomPlan.forEach((element) => {
            array.push({ value: element.numberOfFloors, label: 'Tầng ' + element.numberOfFloors });
        });
        return array;
    };
    const genOptionsKindOfRoom = () => {
        const array = [{ value: 'ALL', label: 'ALL' }];
        kindOfRooms.forEach((element) => {
            array.push({ value: element.id, label: element.name });
        });
        return array;
    };
    const [queryFloor, setQueryFloor] = useState(genOptionsFloor()[0].value);
    const [queryKindOfRoom, setQueryKindOfRoom] = useState(genOptionsKindOfRoom()[0].value);
    const [queryName, setQueryName] = useState('');
    const filterRoomPlan = () => {
        let filter = roomPlan;
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
        return filter;
    };

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
