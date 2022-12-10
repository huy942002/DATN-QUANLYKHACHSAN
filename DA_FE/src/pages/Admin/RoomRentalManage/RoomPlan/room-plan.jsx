import { CheckOutlined, FontColorsOutlined, ReloadOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, FloatButton, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import Floor from './floor';
import axios from 'axios';
// import { getAllNationality } from '~/app/reducers/Nationality/nationality-api';
// import { getAllRentalType } from '~/app/reducers/RentalType/rental-type-api';
// import { getAllServiceByServiceType } from '~/app/reducers/ServiceByServiceType/service-by-service-type-api';
// import { getAllServiceType } from '~/app/reducers/ServiceType/service-type-api';
// import { getAllKindOfRoom } from '~/app/reducers/KindOfRoom/kind-of-room-api';
// import { getAllRoomPlan } from '~/app/reducers/RoomPlan/room-plan-api';

const RoomPlan = () => {

    //Data
    const [roomPlan, setRoomPlan] = useState();
    const [kindOfRoomList, setKindOfRoomList] = useState();
    const [queryFloor,  setQueryFloor] = useState("ALL");
    const [queryKindOfRoom, setQueryKindOfRoom] = useState("ALL");
    const [queryStatus, setQueryStatus] = useState("ALL");
    const [queryName, setQueryName] = useState("");
    //End Data

    //Created
    useEffect(() => {
        window.scrollTo(0, 0);
        const getRoomPlan = async () => {
            await axios.get('http://localhost:8080/api/room-rental-manage/get-room-plan')
                    .then(res => {
                        setRoomPlan(res.data);
                    }).catch(err => {});
        }
        const getAllKindOfRoom = async () => {
            await axios.get('http://localhost:8080/api/kind-of-room')
                    .then(res => {
                        setKindOfRoomList(res.data);
                    }).catch(err => {});
        }
        getRoomPlan();
        getAllKindOfRoom();
    }, []);
    //End Created

    //Gen Data
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
    const filterRoomPlan = () => {
        let filter = null;
        if(roomPlan) {
            filter = roomPlan;
            if (queryFloor !== 'ALL') {
                filter = roomPlan.filter((element) => element.numberOfFloors === queryFloor);
            }
            if (queryStatus !== 'ALL') {
                filter = filter.map((element) => {
                    return {
                        ...element,
                        listRoom: element.listRoom.filter((element2) => element2.rooms.status === queryStatus),
                    };
                });
            }
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
    const genQuantityAll = () => {
        let quantity = 0;
        if(roomPlan) {
            roomPlan.forEach((element) => {
                element.listRoom.forEach((element2) => {
                    quantity += 1;
                });
            });
        }
        return quantity;
    };
    const genQuantityByStatus = (status) => {
        let quantity = 0;
        if(roomPlan) {
            roomPlan.forEach((element) => {
                element.listRoom.forEach((element2) => {
                    if (element2.rooms.status === status) {
                        quantity += 1;
                    }
                });
            });
        }
        return quantity;
    };
    //End Gen Data

    //Function
    const getAllNationality = async () => {
        await axios.get('http://localhost:8080/api/kind-of-room')
                .then(res => {
                    setKindOfRoomList(res.data);
                }).catch(err => {});
    }
    //End Function

    //Util
    //End Util
    
    return (
        <div>
            <div className="text-lg font-semibold mb-6">Sơ đồ phòng</div>
            <div className="text-base flex gap-6 mb-6">
                <div className="flex items-center">
                    <div className="mr-2 font-semibold">Tầng: </div>
                    <Select
                        defaultValue={genOptionsFloor()[0].value}
                        style={{
                            width: 120,
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
                        className="font-semibold"
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                    />
                </div>
            </div>
            <div className="mb-6 text-base flex gap-12">
                <div
                    onClick={() => {
                        setQueryStatus('ALL');
                    }}
                    className={`flex items-center cursor-pointer rounded-lg
                    ${queryStatus === 'ALL' ? 'bg-default-2 font-semibold' : 'hover:bg-default-1'}`}
                >
                    <Badge count={genQuantityAll()} showZero>
                        <div className="h-8 w-8 text-white bg-design-charcoalblack flex items-center justify-center rounded-lg">
                            <FontColorsOutlined />
                        </div>
                    </Badge>
                    <div className="mx-4">ALL</div>
                </div>
                <div
                    onClick={() => {
                        setQueryStatus(1);
                    }}
                    className={`flex items-center cursor-pointer rounded-lg
                    ${queryStatus === 1 ? 'bg-default-2 font-semibold' : 'hover:bg-default-1'}`}
                >
                    <Badge count={genQuantityByStatus(1)} showZero>
                        <div className="h-8 w-8 text-white bg-status-1 flex items-center justify-center rounded-lg">
                            <CheckOutlined />
                        </div>
                    </Badge>
                    <div className="mx-4">Phòng trống</div>
                </div>
                <div
                    onClick={() => {
                        setQueryStatus(2);
                    }}
                    className={`flex items-center cursor-pointer rounded-lg
                    ${queryStatus === 2 ? 'bg-default-2 font-semibold' : 'hover:bg-default-1'}`}
                >
                    <Badge count={genQuantityByStatus(2)} showZero>
                        <div className="h-8 w-8 text-white bg-status-2 flex items-center justify-center rounded-lg">
                            <UserOutlined />
                        </div>
                    </Badge>
                    <div className="mx-4">Đã có khách</div>
                </div>
                <div
                    onClick={() => {
                        setQueryStatus(3);
                    }}
                    className={`flex items-center cursor-pointer rounded-lg
                    ${queryStatus === 3 ? 'bg-default-2 font-semibold' : 'hover:bg-default-1'}`}
                >
                    <Badge count={genQuantityByStatus(3)} showZero>
                        <div className="h-8 w-8 text-white bg-status-3 flex items-center justify-center rounded-lg">
                            <FontAwesomeIcon icon={faBroom} className="h-4 w-4"></FontAwesomeIcon>
                        </div>
                    </Badge>
                    <div className="mx-4">Dọn dẹp</div>
                </div>
                <div
                    onClick={() => {
                        setQueryFloor('ALL');
                        setQueryKindOfRoom('ALL');
                        setQueryStatus('ALL');
                        setQueryName('');
                    }}
                    className={`flex items-center cursor-pointer rounded-lg hover:bg-default-1`}
                >
                    <div className="h-8 w-8 text-white bg-default-3 flex items-center justify-center rounded-lg">
                        <ReloadOutlined />
                    </div>
                    <div className="mx-4">Reload</div>
                </div>
            </div>
            {filterRoomPlan() && filterRoomPlan().map((element, index) => {
                return <Floor key={index} theRoomsOfTheFloor={element} roomPlan={roomPlan} setRoomPlan={setRoomPlan}></Floor>;
            })}
        </div>
    );
};

export default RoomPlan;
