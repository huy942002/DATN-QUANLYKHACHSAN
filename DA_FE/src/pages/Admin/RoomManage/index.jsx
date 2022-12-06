import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllRoom, deleteById, getRoomById } from '~/app/reducers/room'
import { getAllKindOfRoom } from '~/app/reducers/kindOfRoom';
import { getAllNumberOfFloors } from '~/app/reducers/numberOfFloor';
import { getAllFacility } from '~/app/reducers/facilities';
import { UpdateRoom } from '~/app/reducers/room';
import { getByRoomIdSv, UpdateServiceAvailables} from '~/app/reducers/serviceAvailable';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import { getByRoomId, fddeleteById, add } from '~/app/reducers/facilityDetail';
import { getAllService, addsv } from '~/app/reducers/service';

const objRoom = {
    id: '',
    name: '',
    note: '',
    img: '',
    img1: '',
    img2: '',
    img3: '',
    status: '',
    kindOfRoom: {
        id: '',
        name: '',
        note: '',
        priceByDay: '',
        hourlyPrice: '',
        status: ''
    },
    numberOfFloors: {
        id: '',
        numberOfFloors: '',
        status: ''
    }

};


const fdobj = {
    id: '',
    status: '',
    rooms: {
        id: '',
        name: '',
        note: '',
        img: '',
        img1: '',
        img2: '',
        img3: '',
        status: '',
        kindOfRoom: {
            id: '',
            name: '',
            note: '',
            prices_by_day: '',
            hourly_prices: '',
            status: ''
        },
        numberOfFloors: {
            id: '',
            numberOfFloors: '',
            status: ''
        }
    },
    facilities: {
        id: '',
        name: '',
        status: ''
    }

}

function RoomManage() {
    const [visible, setVisible] = useState(false);
    const [visibleAdd2, setVisibleAdd2] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [Room, setRoom] = useState(objRoom);
    const rooms = useSelector((state) => state.room.rooms);
    const room = useSelector((state) => state.room.room);
    const KindOfRoom = useSelector((state) => state.kindOfRoom.kindOfRoom);
    const NumberOfFloors = useSelector((state) => state.numberOfFloor.numberOfFloors);
    const FacilityDetail = useSelector((state) => state.facilityDetail.facilityDetail);
    const Facility = useSelector((state) => state.facility.facilities);
    const services = useSelector((state) => state.service.services);
    const [FacilitieDetails, setFacilitieDetails] = useState(fdobj);
    const [ServiceAvailable, setServiceAvailable] = useState([]);
    const [ServiceAvailableUpdate, setServiceAvailableUpdate] = useState();
    const [idcheck, setId] = useState(-1);
    const [valueSearch, setValueSearch] = useState('2');
    const [valueSearch1, setValueSearch1] = useState('');
    const ServiceAva = useSelector((state) => state.serviceAvailable.ServiceAvailables);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNumberOfFloors());
        dispatch(getAllKindOfRoom());
        dispatch(getAllRoom());
        dispatch(getAllFacility());
        dispatch(getAllService());
        
    }, []);

    useEffect(() => {
        setRoom(room);

        setFacilitieDetails(FacilitieDetails);
    }, [room, FacilityDetail])

    useEffect(() => {
        setValueSearch(valueSearch);

    }, [valueSearch])


    const addServiceAvailable = () => {
        dispatch(addsv())
    };

    const addFacilitieDetails = (data) => {
        setFacilitieDetails({ ...FacilitieDetails, room: room, facilities: data, status: 1 });

        console.log(FacilitieDetails.facilities.id)
        dispatch(add({ ...FacilitieDetails, id: '', status: 1, rooms: room, facilities: data }));
        dispatch(getByRoomId(room.id));
    };

    const updateSV = (id,data) => {
        setServiceAvailableUpdate(data)
        dispatch(UpdateServiceAvailables({...ServiceAvailableUpdate,id:id}));
        dispatch(getByRoomId(room.id));
    };

    function getIdUpdate(id) {
        dispatch(getRoomById(id));
        dispatch(getByRoomId(id));
        dispatch(getByRoomIdSv(id));

        setVisibleUpdate(true);
    }

    function getIdDelete(id) {
        dispatch(getRoomById(id));
        dispatch(getByRoomId(id));
        dispatch(getByRoomIdSv(id));
        setId(id);
        setVisibleDelete(true);
    }

    function deleteItem(id) {
        dispatch(fddeleteById(id));
        dispatch(getByRoomId(room.id));
    }

    function deleteItem2(id) {
        console.log(id)
        setServiceAvailable(ServiceAvailable.filter(item => item.id !== id));
        dispatch(getAllRoom());
    }

    function getModal() {
        setVisibleAdd(true);
    }

    function getModal2() {
        setVisibleAdd2(true);
    }

    const [image, setImage] = useState("");
    function uploadImage(data1) {
        if (image === '') {
            handleUpdate(data1, room.img);
        } else {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "datnqlks")
            data.append("cloud_name", "dbjvfbdix")
            fetch("https://api.cloudinary.com/v1_1/dbjvfbdix/image/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    handleUpdate(data1, data.url);
                })
                .catch(err => console.log(err))
        }

    }

    function handleDeleteById() {
        dispatch(UpdateRoom({ ...Room, status: 0 }));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        dispatch(getAllRoom());
        setVisibleDelete(false);
    }

    function handleUpdate(data, url) {
        setRoom(data);
        dispatch(UpdateRoom({ ...Room, img: url }));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        setVisibleUpdate(false);
    }

    return (
        <div className="text-black pt-6 px-1 pb-5">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link
                            to={config.routes.roomPlan}
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} />
                            <span className="px-2">Quản lý Chi tiết phòng</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid mt-2  rounded-full text-white">

                <div className="mb-2 border-b-4 mx-14 border-blue-600 dark:border-blue-600">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                        <li className="mr-4 ml-6" role="presentation">
                            <button className="inline-block text-4xl p-4  rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500" id="profile-tab" ><Link to={config.routes.roomPlan}>Danh sách phòng</Link></button>
                        </li>
                        <li className="mr-8 ml-12" role="presentation">
                            <button className="inline-block text-4xl p-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600 dark:border-transparent text-gray-400 dark:text-blue-600 border-blue-600 dark:border-blue-600" id="dashboard-tab" ><Link to={config.routes.roomPlan}>Tầng</Link></button>
                        </li>
                        <li className="mr-2  ml-12" role="presentation">
                            <button className="inline-block text-4xl p-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600 dark:border-transparent text-gray-400 dark:text-blue-600 border-grablue-600 dark:border-blue-600" id="settings-tab"><Link to={config.routes.roomPlan}>Loại phòng</Link></button>
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6 ml-8 text-black">
                    <div>
                        <span className="ml-3 mr-3 font-bold">Tầng :</span>
                        <select
                            name="numberOfFloors"
                            id="numberOfFloors"
                            className="w-40 p-1 rounded"
                            onChange={(e) =>
                                setTimeout(() => setValueSearch(NumberOfFloors[e.target.options[e.target.selectedIndex].id].numberOfFloors), 1000)}                       >
                            {NumberOfFloors.map((n, index) => (
                                <option key={n.id} value={n.numberOfFloors} id={index}>
                                    {n.numberOfFloors}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span className="mr-3 font-bold">Loại phòng :</span>
                        <select
                            name="KindOfRoom"
                            id="KindOfRoom"
                            className="w-40 p-1 rounded"
                            onChange={(e) => {
                                setTimeout(() => setValueSearch1(KindOfRoom[e.target.options[e.target.selectedIndex].id].id), 1000);

                            }}

                        >
                            {KindOfRoom.map((x, index) => (
                                <option key={x.id} value={x.name} id={index}>
                                    {x.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    setVisible(true);
                                }}
                                className="py-3 px-4 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <span className="mx-2">THÊM</span>
                            </button>
                        </div>
                    </div>

                    <Modal show={visible} size="md" popup={true} onClose={() => setVisible(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Số Phòng Muốn Thêm
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="gray"
                                    >
                                        <Link
                                            to={config.routes.createRoomManage}
                                        >
                                            Thêm 1 Phòng
                                        </Link>

                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDelete(false)}>
                                        <Link
                                            to={config.routes.createOptionRoomManage}
                                        >
                                            Thêm Nhiều Phòng
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    ROOM NAME
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    NUMBER OF FLOOR
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    KIND OF ROOM
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    IMG
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    PRICE OF DAY
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    HOURLY PRICE
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    STATUS
                                </th>
                                <th scope="col" className="py-3 px-6" colSpan={2}>
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms
                            .filter((x) => (x.kindOfRoom.id + "").toLowerCase().includes(valueSearch1))
                                .filter((x) => (x.numberOfFloors.numberOfFloors + "").toLowerCase().includes(valueSearch))
                                .map((x) => (
                                    <tr key={x.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                            {x.name}
                                        </th>
                                        <td className="py-4 px-6">
                                            {x.numberOfFloors.numberOfFloors}
                                        </td>
                                        <td className="py-4 px-6" >
                                            {x.kindOfRoom.name}
                                        </td>
                                        <td className="py-4 px-6">
                                            <img src={x.img} className="max-w-xl h-auto rounded-sm" alt="image description" width={100} />
                                        </td>
                                        <td className="py-4 px-6">
                                            {x.kindOfRoom.priceByDay}
                                        </td>
                                        <td className="py-4 px-6">
                                            {x.kindOfRoom.hourlyPrice}
                                        </td>
                                        <td className="py-4 px-6 ">
                                             <p className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</p>
                                        </td>
                                        <td className="py-4 px-6 ">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getIdUpdate(x.id);
                                                }}
                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            >
                                                <span className="mx-2">SỬA</span>
                                            </button>
                                        </td>
                                        <td className="py-4 px-6 ">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getIdDelete(x.id);
                                                }}
                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            >
                                                <span className="mx-2">Xóa</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {/* Modal delete */}
                    <Modal show={visibleDelete} size="md" popup={true} onClose={() => setVisibleDelete(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận xóa nhân viên ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteById();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDelete(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal show={visibleUpdate} size="4xl" position="top-center" popup={true} onClose={() => setVisibleUpdate(false)}>
                        <Modal.Header >
                            <p className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">Update Room</p>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="text-black">
                                    <div>
                                        <label
                                            htmlFor=""
                                            className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Tên Phòng  :
                                        </label>
                                        <input
                                            type="text"
                                            id="nameRoom"
                                            name="nameRoom"
                                            value={Room.name || ''}
                                            onChange={(e) => setRoom({ ...Room, name: e.target.value })}
                                            className="w-96 p-1 rounded"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 mt-8 text-black">
                                        <div>
                                            <span className="mr-3 font-bold">Loại phòng :</span>
                                            <select
                                                name="KindOfRoom"
                                                id="KindOfRoom"
                                                value={Room?.kindOfRoom?.name || ''}
                                                className="w-40 p-1 rounded"
                                                onChange={(e) => {
                                                    const index = e.target.options[e.target.selectedIndex].id;
                                                    setRoom({
                                                        ...Room,
                                                        kindOfRoom: {
                                                            id: KindOfRoom[index].id,
                                                            roomTypeName: KindOfRoom[index].roomTypeName,
                                                            note: KindOfRoom[index].note,
                                                            priceByDay: KindOfRoom[index].priceByDay,
                                                            hourlyPrice: KindOfRoom[index].hourlyPrice,
                                                            status: KindOfRoom[index].status,
                                                        },
                                                    });
                                                }}
                                            >
                                                {KindOfRoom.map((x, index) => (
                                                    <option key={x.id} value={x.roomTypeName} id={index}>
                                                        {x.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button type="button" className="" >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                            </button>
                                        </div>
                                        <div>
                                            <span className="ml-3 mr-3 font-bold">Tầng :</span>
                                            <select
                                                name="numberOfFloors"
                                                id="numberOfFloors"
                                                className="w-40 p-1 rounded"
                                                value={Room?.numberOfFloors?.numberOfFloors || ''}
                                                onChange={(e) => {
                                                    const index = e.target.options[e.target.selectedIndex].id;
                                                    setRoom({
                                                        ...Room,
                                                        numberOfFloors: {
                                                            id: NumberOfFloors[index].id,
                                                            numberOfFloors: NumberOfFloors[index].name,
                                                            status: NumberOfFloors[index].status
                                                        },
                                                    });
                                                }}                                >
                                                {NumberOfFloors.map((n, index) => (
                                                    <option key={n.id} value={n.numberOfFloors} id={index}>
                                                        {n.numberOfFloors}
                                                    </option>
                                                ))}
                                            </select>
                                            <button type="button" className="" >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mt-8 text-black">
                                        <div><label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Giá Tiền Theo Ngày:
                                        </label>
                                            <input
                                                type="number"
                                                id=""
                                                defaultValue={Room?.kindOfRoom?.priceByDay || ''}
                                                className="w-64 p-1 rounded"
                                                placeholder=""
                                            /></div>
                                        <div><label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Giá Tiền Theo Giờ:
                                        </label>
                                            <input
                                                type="number"
                                                id=""
                                                defaultValue={Room?.kindOfRoom?.hourlyPrice || ''}
                                                className="w-64 p-1 rounded"
                                                placeholder=""
                                            /></div>
                                    </div>

                                    <div className="mt-8">
                                        <label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Tiện Ích :
                                        </label>
                                        <div className="grid gap-x-8 gap-y-4 grid-cols-3 items-center pl-3">

                                            {FacilityDetail.map((f) => (

                                                <div key={f.id} id="toast-default" className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                                    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
                                                        <span className="sr-only"></span>
                                                    </div>
                                                    <div className="ml-3 text-sm font-normal">{f.facilities.name || ''}</div>
                                                    <button type="button" onClick={() => { deleteItem(f.id) }} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <button type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => {
                                                getModal();
                                            }} >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                            Add
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        <label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Dịch Vụ :
                                        </label>
                                        <div className="overflow-x-auto relative shadow-md md:rounded-lg">
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 md:h-auto">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="py-3 px-6">
                                                            NAME
                                                        </th>
                                                        <th scope="col" className="py-3 px-6">
                                                            QUANTITY
                                                        </th>
                                                        <th scope="col-2" className="py-3 px-6">
                                                            ACTION
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ServiceAva.map((s) => (
                                                        <tr key={s.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {s.servicess.name}
                                                            </td>
                                                            <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                <input id="vue-checkbox-list" type="number" defaultValue={s.quantity} onChange={(e) =>setServiceAvailableUpdate({...ServiceAvailableUpdate,quantity: e.target.value}) } className="w-24 h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        updateSV(s.id,ServiceAvailableUpdate)
                                                                    }}
                                                                    className="py-2 mx-1 text-sm font-medium text-center text-white bg-violet-400 rounded-lg"
                                                                >
                                                                    <span className="mx-2">SỬA</span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {

                                                                    }}
                                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                                >
                                                                    <span className="mx-2">Xóa</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <button type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => {
                                                getModal2();
                                            }} >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                            Add
                                        </button>

                                    </div>

                                    <div className="mt-8">
                                        <label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Trạng Thái :
                                        </label>

                                        <div className="flex items-center mb-4">
                                            <input
                                                value={'1'}
                                                checked={Room.status === 1}
                                                onChange={(e) => setRoom({ ...Room, status: e.target.value })}
                                                id="disabled-radio-1" type="radio" name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="disabled-radio-1" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Hoạt Động</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                value={'0'}
                                                checked={Room.status === 0}
                                                onChange={(e) => setRoom({ ...Room, status: e.target.value })}
                                                id="disabled-radio-2" type="radio" name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="disabled-radio-2" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Không Hoạt Động</label>
                                        </div>

                                    </div>

                                    <div className="mt-8">
                                        <label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Ảnh :
                                        </label>
                                        <div className="flex justify-center items-center w-full mt-8">
                                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <label
                                            htmlFor=""
                                            className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                        >
                                            Ghi Chú :
                                        </label>
                                        <textarea id="message" rows="4" value={Room.note || ''} onChange={(e) => setRoom({ ...Room, note: e.target.value })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Note..."></textarea>
                                    </div>



                                </div>
                                <div className="mt-8">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                uploadImage(Room);
                                            }}
                                            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <span className="mx-2">Update</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={visibleAdd} size="md" popup={false} onClose={() => setVisibleAdd(false)}>
                        <Modal.Header >
                        </Modal.Header >
                        <Modal.Body>
                            <div className="overflow-x-auto relative shadow-md md:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 md:h-auto">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                NAME
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                STATUS
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                ACTION
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Facility.map((fs) => (
                                            <tr key={fs.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {fs.name}
                                                </td>
                                                <td className="py-4 px-6 ">
                                                    <label htmlFor="" className="rounded-full dark:text-gpy-2 px-3 text-sm font-medium text-white bg-lime-500"></label>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={fs}
                                                        type="button"
                                                        onClick={() => {
                                                            addFacilitieDetails(fs);
                                                        }}
                                                        className="py-2 px-3 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        <span className="mx-2">Add</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={visibleAdd2} size="mx" popup={false} onClose={() => setVisibleAdd2(false)}>
                        <Modal.Header >
                        </Modal.Header >
                        <Modal.Body>
                            <div className="overflow-x-auto relative shadow-md md:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 md:h-auto">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                NAME
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                SERVICE TYPE
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                PRICES
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                STATUS
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                ACTION
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((s) => (
                                            <tr key={s.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.name}
                                                </td>
                                                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.serviceType.name}
                                                </td>
                                                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {s.prices}
                                                </td>
                                                <td className="py-4 px-6 ">
                                                    <label htmlFor="" className="rounded-full dark:text-gpy-2 px-3 text-sm font-medium text-white bg-lime-500"></label>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={s}
                                                        type="button"
                                                        onClick={() => {
                                                            addServiceAvailable(s.id, s.name, 1)
                                                        }}
                                                        className="py-2 px-3 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        <span className="mx-2">Add</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* Edit */}
                    {/* <Modal show={visibleDelete} size="md" popup={true} onClose={() => setVisibleDelete(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận xóa nhân viên ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteById(room);
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDelete(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> */}
                </div>
            </div>
        </div>
    )
}
export default RoomManage;


