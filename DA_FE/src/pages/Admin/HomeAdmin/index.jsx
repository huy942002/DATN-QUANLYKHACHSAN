import {
    faBed,
    faBorderAll,
    faBroom,
    faBuilding,
    faPerson,
    faPersonCircleCheck,
    faPersonWalkingArrowRight,
    faPersonWalkingLuggage,
    faRestroom,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useEffect, useState } from 'react';
import { useState } from 'react';
import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { Link } from 'react-router-dom';

// import http from '~/services/apiSevices';

function HomeAdmin() {
    // const [listRoom, setListRoom] = useState([]);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const result = await http.httpGet('room');
    //         setListRoom(result);
    //     };

    //     fetch();
    // }, []);
    // console.log(listRoom);
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <div className="p-5 text-black">
            <div className="grid grid-cols-5 text-white">
                <div className="p-3 rounded-md grid grid-cols-4 text-center">
                    <div className="col-start-1 bg-blue-500 flex justify-center items-center rounded-md">
                        <FontAwesomeIcon icon={faBorderAll} />
                    </div>
                    <div className="col-start-2 col-end-5 text-black flex justify-center items-center">
                        Tất cả (100)
                    </div>
                </div>
                <div className="p-3 rounded-md grid grid-cols-4 text-center">
                    <div className="col-start-1 bg-green-600 flex justify-center items-center rounded-md">
                        <FontAwesomeIcon icon={faBed} />
                    </div>
                    <div className="col-start-2 col-end-5 text-black flex justify-center items-center">
                        Phòng trống (50)
                    </div>
                </div>
                <div className="p-3 rounded-md grid grid-cols-4 text-center">
                    <div className="col-start-1 bg-blue-700 flex justify-center items-center rounded-md">
                        <FontAwesomeIcon icon={faBed} />
                    </div>
                    <div className="col-start-2 col-end-5 text-black flex justify-center items-center">
                        Có khách (50)
                    </div>
                </div>
                <div className="p-3 rounded-md grid grid-cols-4 text-center">
                    <div className="col-start-1 bg-yellow-400 flex justify-center items-center rounded-md">
                        <FontAwesomeIcon icon={faBroom} />
                    </div>
                    <div className="col-start-2 col-end-5 text-black flex justify-center items-center">
                        Đang dọn (20)
                    </div>
                </div>
                <div className="p-3 rounded-md grid grid-cols-4 text-center">
                    <div className="col-start-1 bg-red-500 flex justify-center items-center rounded-md">
                        <FontAwesomeIcon icon={faPersonCircleCheck} />
                    </div>
                    <div className="col-start-2 col-end-5 text-black flex justify-center items-center">
                        Đến giờ checkout (30)
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div>
                    <span className="mr-2 font-bold">Tầng</span>
                    <select name="" id="" className="w-40 p-1 rounded">
                        <option value="">Tất cả</option>
                        <option value="">Tầng 1</option>
                        <option value="">Tầng 2</option>
                        <option value="">Tầng 3</option>
                        <option value="">Tầng 4</option>
                    </select>
                </div>
                <div>
                    <span className="mr-2 font-bold">Loại phòng</span>
                    <select name="" id="" className="w-40 p-1 rounded">
                        <option value="">Tất cả</option>
                        <option value="">Phòng đôi</option>
                        <option value="">Phòng đơn</option>
                        <option value="">Phòng VIP</option>
                        <option value="">Phòng khác</option>
                    </select>
                </div>
                <div>
                    <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
                        <span className="mx-2">Danh sách checkin</span>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                        <span className="mx-2">Danh sách checkout</span>
                    </button>
                </div>
            </div>
            {/* <div>
                {listRoom.map((x) => (
                    <p key={x.roomsId}>{x.roomsId}</p>
                ))}
            </div> */}
            <div className="grid grid-cols-4 gap-4 mt-8 p-2">
                <div className="col-start-1 col-end-5">
                    <FontAwesomeIcon icon={faBuilding} />
                    <span className="bg-blue-100 text-blue-800 text-lg mx-2 font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        Tầng 1
                    </span>
                </div>
                <div
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setAnchorPoint({ x: e.clientX, y: e.clientY });
                        toggleMenu(true);
                    }}
                    className="bg-red-500 rounded-md p-3 border-solid grid grid-cols-4"
                >
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                    <ControlledMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
                        <MenuItem>
                            <Link to={`/admin/room-check/data`}>Checkout</Link>
                        </MenuItem>
                        <MenuItem>Hủy</MenuItem>
                        <MenuItem>Dọn phòng</MenuItem>
                    </ControlledMenu>
                </div>
                <div className="bg-blue-700 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                </div>
                <div className="bg-yellow-400 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">103</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Đang dọn</div>
                </div>
                <div className="bg-yellow-400 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">103</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Đang dọn</div>
                </div>
                <div className="bg-yellow-400 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">103</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Đang dọn</div>
                </div>
                <div className="bg-yellow-400 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">103</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Đang dọn</div>
                </div>
                <div className="bg-green-600 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">104</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Phòng trống</div>
                </div>
                <div className="bg-green-600 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">104</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Phòng trống</div>
                </div>
                <div className="col-start-1 col-end-5">
                    <FontAwesomeIcon icon={faBuilding} />
                    <span className="bg-blue-100 text-blue-800 text-lg mx-2 font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        Tầng 2
                    </span>
                </div>
                <div className="bg-green-600 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faRestroom} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đôi</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">104</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Phòng trống</div>
                </div>
                <div className="bg-red-500 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                </div>
                <div className="bg-red-500 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                </div>
                <div className="bg-blue-700 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                </div>
                <div className="bg-red-500 rounded-md p-3 border-solid grid grid-cols-4">
                    <div className="col-start-1">
                        <FontAwesomeIcon icon={faPerson} className="text-2xl" />
                    </div>
                    <div className="col-start-2 col-end-4">
                        <h3 className="text-center text-white">Phòng đơn</h3>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <h1 className="text-xl text-white text-center">102</h1>
                    </div>
                    <div className="col-start-1 col-end-5 text-center">Nguyễn Văn B</div>
                    <div className="col-start-1 col-end-5 text-center">20:20 - 19/10/2022</div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
