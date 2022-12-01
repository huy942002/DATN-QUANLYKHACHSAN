import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAllKindOfRoom } from '~/app/reducers/kindOfRoom';
import { AddNBF, getAllNumberOfFloors } from '~/app/reducers/numberOfFloor';
import { getAllFacility } from '~/app/reducers/facilities';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '~/app/reducers/service';
import { addsvOption, addRoomOption } from '~/app/reducers/room';
import { Modal, Label, FileInput } from 'flowbite-react';
import { addByIdOption } from '~/app/reducers/facilityDetail';

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
        prices_by_day: '',
        hourly_prices: '',
        status: '',
    },
    numberOfFloors: {
        id: '',
        numberOfFloors: '',
        status: '',
    },
};

const dataOption = {
    sl1: 0,
};

const NumberOfFloorss = {
    id: '',
    numberOfFloors: 1,
    status: 1,
};

function CreateOptionRoomManager() {
    const [visibleAdd2, setVisibleAdd2] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [Room, setRoom] = useState(objRoom);
    const [roomAdd, setRoomAdd] = useState(objRoom);
    const KindOfRoom = useSelector((state) => state.KindOfRoom.KindOfRoom);
    const Facility = useSelector((state) => state.Facility.Facility);
    const services = useSelector((state) => state.service.services);
    const NumberOfFloors = useSelector((state) => state.NumberOfFloors.NumberOfFloors);
    const [FacilitieDetails, setFacilitieDetails] = useState([]);
    const [ServiceAvailable, setServiceAvailable] = useState([]);
    const [data2, setData] = useState(dataOption);
    const [Service, setService] = useState('');
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [url, setUrl] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const dispatch = useDispatch();
    const [index, setindex] = useState(1);

    const addServiceAvailable = (id, value, sl) => {
        let obj = { id: id, sl: sl, name: value };
        setServiceAvailable(() => [...ServiceAvailable, obj]);
    };

    const addFacilitieDetails = (id, value) => {
        let obj = { id: id, name: value };
        setFacilitieDetails(() => [...FacilitieDetails, obj]);
        console.log(FacilitieDetails);
    };

    function deleteItem(id) {
        console.log(id);
        setFacilitieDetails(FacilitieDetails.filter((item) => item.id !== id));
    }

    function deleteItem2(id) {
        console.log(id);
        setServiceAvailable(ServiceAvailable.filter((item) => item.id !== id));
    }

    function uploadImage(dataRoom, datasl) {
        if (datasl === 0) {
            toast.error('Bạn chưa điền số phòng muốn tạo!', { autoClose: 2000 });
        } else if (dataRoom.name === '') {
            toast.error('Bạn chưa điền tên phòng!', { autoClose: 2000 });
        } else {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'datnqlks');
            data.append('cloud_name', 'dbjvfbdix');
            fetch('https://api.cloudinary.com/v1_1/dbjvfbdix/image/upload', {
                method: 'post',
                body: data,
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setUrl(data.url);
                    console.log(data.url);
                    console.log(data);
                    const data1 = new FormData();
                    data1.append('file', image1);
                    data1.append('upload_preset', 'datnqlks');
                    data1.append('cloud_name', 'dbjvfbdix');
                    fetch('https://api.cloudinary.com/v1_1/dbjvfbdix/image/upload', {
                        method: 'post',
                        body: data1,
                    })
                        .then((resp) => resp.json())
                        .then((data11) => {
                            setUrl1(data11.url);
                            console.log(url1);
                            console.log(data11);
                            const data2 = new FormData();
                            data2.append('file', image2);
                            data2.append('upload_preset', 'datnqlks');
                            data2.append('cloud_name', 'dbjvfbdix');
                            fetch('https://api.cloudinary.com/v1_1/dbjvfbdix/image/upload', {
                                method: 'post',
                                body: data2,
                            })
                                .then((resp) => resp.json())
                                .then((data21) => {
                                    setUrl2(data21.url);
                                    console.log(url2);
                                    console.log(data21);
                                    const data3 = new FormData();
                                    data3.append('file', image3);
                                    data3.append('upload_preset', 'datnqlks');
                                    data3.append('cloud_name', 'dbjvfbdix');
                                    fetch('https://api.cloudinary.com/v1_1/dbjvfbdix/image/upload', {
                                        method: 'post',
                                        body: data3,
                                    })
                                        .then((resp) => resp.json())
                                        .then((data31) => {
                                            setUrl3(data31.url);
                                            console.log(url3);
                                            console.log(data31);
                                            addRoom(dataRoom, datasl);
                                        })
                                        .catch((err3) => console.log(err3));
                                })
                                .catch((err2) => console.log(err2));
                        })
                        .catch((err1) => console.log(err1));
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        dispatch(getAllNumberOfFloors());
        dispatch(getAllKindOfRoom());
        dispatch(getAllFacility());
        dispatch(getAllService());
    }, []);

    useEffect(() => {
        setFacilitieDetails(FacilitieDetails);
        setRoomAdd(roomAdd);
    }, [FacilitieDetails, data2]);

    // const getNBF = () => {
    //     dispatch(getAllNumberOfFloors());
    // };

    const addRoom = (data, datasl) => {
        setRoomAdd(data);
        if (roomAdd.kindOfRoom.id === '') {
            // default no change gender and nationality
            setRoomAdd({
                ...roomAdd,
                kindOfRoom: KindOfRoom[0],
                img: url,
                img1: url1,
                img2: url2,
                img3: url3,
                status: 1,
            });
        } else if (roomAdd.note === '') {
            // default no change gender and nationality
            setRoomAdd({
                ...roomAdd,
                kindOfRoom: KindOfRoom[0],
                img: url,
                img1: url1,
                img2: url2,
                img3: url3,
                status: 1,
            });
        } else {
            setRoomAdd({ ...roomAdd, img: url, img1: url1, img2: url2, img3: url3, status: 1 });
        }
        setTimeout(() => dispatch(addRoomOption({ sl: datasl, roomAdd })), 1000);
        toast.success('Thêm thành công', { autoClose: 2000 });
        dispatch(getAllNumberOfFloors());
    };

    function addFSV() {
        if (FacilitieDetails.length !== 0) {
            for (let index = 0; index < FacilitieDetails.length; index++) {
                console.log('Có vào');
                dispatch(addByIdOption(FacilitieDetails[index].id));
            }
        }

        if (ServiceAvailable.length !== 0) {
            for (let index = 0; index < ServiceAvailable.length; index++) {
                console.log('Có vào2');
                dispatch(addsvOption(ServiceAvailable[index]));
            }
        }
    }

    function getModal() {
        setVisibleAdd(true);
    }

    function getModal2() {
        setVisibleAdd2(true);
    }

    const updateSL = (id1, sl2) => {
        if (sl2 <= 0) {
            toast.error('Lỗi', { autoClose: 2000 });
        } else {
            let array = [...ServiceAvailable];
            array.map((o, i) => {
                if (o.id === id1) array[i] = { id: id1, sl: sl2, name: o.name };
            });

            setServiceAvailable([...array]);
        }
    };

    return (
        <div className="text-black p-3">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link
                            to={config.routes.homeAdmin}
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

            <div className="mb-2 border-b-4 mx-14 border-blue-600 dark:border-blue-600">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li className="mr-4 ml-6" role="presentation">
                        <button
                            className="inline-block text-4xl p-4  rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                            id="profile-tab"
                        >
                            <Link to={config.routes.homeAdmin}>Danh sách phòng</Link>
                        </button>
                    </li>
                    <li className="mr-8 ml-12" role="presentation">
                        <button
                            className="inline-block text-4xl p-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600 dark:border-transparent text-gray-400 dark:text-blue-600 border-blue-600 dark:border-blue-600"
                            id="dashboard-tab"
                        >
                            <Link to={config.routes.homeAdmin}>Tầng</Link>
                        </button>
                    </li>
                    <li className="mr-2  ml-12" role="presentation">
                        <button
                            className="inline-block text-4xl p-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600 dark:border-transparent text-gray-400 dark:text-blue-600 border-grablue-600 dark:border-blue-600"
                            id="settings-tab"
                        >
                            <Link to={config.routes.homeAdmin}>Loại phòng</Link>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="grid grid-cols-6 gap-4 mt-8 rounded-full">
                <div className="col-start-2 col-span-4">
                    <form>
                        <div className="text-black">
                            <div className="grid grid-cols-2 text-black">
                                <div>
                                    <label htmlFor="" className="mt-8 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                                        Số Phòng muốn tạo :
                                    </label>
                                    <input
                                        type="number"
                                        id=""
                                        onChange={(e) => setData({ ...data2, sl1: e.target.value })}
                                        className="w-40 p-1 rounded"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 text-black">
                                <div className="mt-8">
                                    <label htmlFor="" className="mb-2 mr-7 text-gray-900 dark:text-gray-300 font-bold">
                                        Số Tầng :
                                    </label>
                                    <input
                                        type="number"
                                        id="nameNBF"
                                        name="nameNBF"
                                        defaultValue={
                                            parseInt(NumberOfFloors[NumberOfFloors.length - 1]?.numberOfFloors) + index
                                        }
                                        disabled={true}
                                        className="mb-2 mr-7 w-40 p-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                    />
                                    <button type="button" className="" onClick={() => {}}>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-8">
                                    <label htmlFor="" className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                                        Tên Phòng :
                                    </label>
                                    <input
                                        type="text"
                                        id="nameRoom"
                                        name="nameRoom"
                                        onChange={(e) => setRoomAdd({ ...roomAdd, name: e.target.value })}
                                        className="w-40 p-1 rounded"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 text-black">
                                <div>
                                    <span className="mr-3 font-bold">Loại phòng :</span>
                                    <select
                                        name="KindOfRoom"
                                        id="KindOfRoom"
                                        className="w-40 p-1 rounded"
                                        onChange={(e) => {
                                            const index = e.target.options[e.target.selectedIndex].id;
                                            setRoomAdd({
                                                ...roomAdd,
                                                kindOfRoom: {
                                                    id: KindOfRoom[index].id,
                                                    name: KindOfRoom[index].name,
                                                    note: KindOfRoom[index].note,
                                                    prices_by_day: KindOfRoom[index].prices_by_day,
                                                    hourly_prices: KindOfRoom[index].hourly_prices,
                                                    status: KindOfRoom[index].status,
                                                },
                                            });
                                            setRoom({
                                                ...Room,
                                                kindOfRoom: {
                                                    id: KindOfRoom[index].id,
                                                    name: KindOfRoom[index].name,
                                                    note: KindOfRoom[index].note,
                                                    prices_by_day: KindOfRoom[index].prices_by_day,
                                                    hourly_prices: KindOfRoom[index].hourly_prices,
                                                    status: KindOfRoom[index].status,
                                                },
                                            });
                                        }}
                                    >
                                        {KindOfRoom.map((x, index) => (
                                            <option key={x.id} value={x.name} id={index}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mt-8 text-black">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="mb-2 mt-8 mr-6 text-gray-900 dark:text-gray-300 font-bold"
                                    >
                                        Giá Tiền Theo Ngày:
                                    </label>
                                    <input
                                        type="number"
                                        id=""
                                        defaultValue={Room?.kindOfRoom?.prices_by_day || ''}
                                        className="w-40 p-1 rounded"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor=""
                                        className="mb-2 mt-8 mr-6 text-gray-900 dark:text-gray-300 font-bold"
                                    >
                                        Giá Tiền Theo Giờ :
                                    </label>
                                    <input
                                        type="number"
                                        id=""
                                        defaultValue={Room?.kindOfRoom?.hourly_prices || ''}
                                        className="w-40 p-1 rounded"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <label htmlFor="" className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold">
                                    Tiện Ích :
                                </label>
                                <div className="grid gap-x-8 gap-y-4 grid-cols-3 items-center pl-3">
                                    {FacilitieDetails.map((f) => (
                                        <div
                                            key={f.id}
                                            id="toast-default"
                                            className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                                            role="alert"
                                        >
                                            <div className="ml-3 text-sm font-normal">{f.name}</div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    deleteItem(f.id);
                                                }}
                                                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                                data-dismiss-target="#toast-default"
                                                aria-label="Close"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                        getModal();
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                    Add
                                </button>
                            </div>

                            <div className="mt-8">
                                <label htmlFor="" className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold">
                                    Dịch Vụ :
                                </label>
                                <div className="grid gap-x-8 gap-y-4 grid-cols-3 items-center pl-3">
                                    {ServiceAvailable.map((s) => (
                                        <div
                                            key={s.id}
                                            id="toast-default"
                                            className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                                            role="alert"
                                        >
                                            <input
                                                id="vue-checkbox-list"
                                                type="number"
                                                value={s.sl}
                                                onChange={(e) => updateSL(s.id, e.target.value)}
                                                className="w-24 h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="vue-checkbox-list"
                                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {s.name}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => deleteItem2(s.id)}
                                                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                                data-dismiss-target="#toast-default"
                                                aria-label="Close"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                        getModal2();
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                    Add
                                </button>
                            </div>

                            {/* <div className="mt-8">
                                <label
                                    htmlFor=""
                                    className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Trạng Thái :
                                </label>

                                <div className="flex items-center mb-4">
                                    <input
                                        value={'1'}
                                        checked
                                        onChange={(e) => setRoomAdd({ ...roomAdd, status: e.target.value })}
                                        id="disabled-radio-1" type="radio" name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="disabled-radio-1" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Hoạt Động</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        value={'0'}
                                        checked={roomAdd.status === '0'}
                                        onChange={(e) => setRoomAdd({ ...roomAdd, status: e.target.value })}
                                        id="disabled-radio-2" type="radio" name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="disabled-radio-2" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Không Hoạt Động</label>
                                </div>

                            </div> */}

                            <div className="mt-8">
                                <label htmlFor="" className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold">
                                    Ảnh :
                                </label>
                                <div id="fileUpload">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file" value="Upload file" />
                                    </div>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        helperText="A profile picture is useful to confirm your are logged into your account"
                                    />
                                </div>
                                <div id="fileUpload">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file" value="Upload file" />
                                    </div>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage1(e.target.files[0])}
                                        helperText="A profile picture is useful to confirm your are logged into your account"
                                    />
                                </div>
                                <div id="fileUpload">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file" value="Upload file" />
                                    </div>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage2(e.target.files[0])}
                                        helperText="A profile picture is useful to confirm your are logged into your account"
                                    />
                                </div>
                                <div id="fileUpload">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file" value="Upload file" />
                                    </div>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage3(e.target.files[0])}
                                        helperText="A profile picture is useful to confirm your are logged into your account"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <label htmlFor="" className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold">
                                    Ghi Chú :
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    onChange={(e) => setRoomAdd({ ...roomAdd, note: e.target.value })}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Note..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        uploadImage(roomAdd, data2.sl1);
                                        // handleAdd(roomAdd, data2, NBFAdd);
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span className="mx-2">THÊM</span>
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        addFSV();
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span className="mx-2">THÊMFSV</span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <Modal show={visibleAdd} size="md" popup={false} onClose={() => setVisibleAdd(false)}>
                        <Modal.Header></Modal.Header>
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
                                            <tr
                                                key={fs.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {fs.name}
                                                </td>
                                                <td className="py-4 px-6 ">
                                                    <label
                                                        htmlFor=""
                                                        className="rounded-full dark:text-gpy-2 px-3 text-sm font-medium text-white bg-lime-500"
                                                    ></label>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={fs}
                                                        type="button"
                                                        onClick={() => {
                                                            addFacilitieDetails(fs.id, fs.name);
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
                        <Modal.Header></Modal.Header>
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
                                            <tr
                                                key={s.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {s.name}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {s.serviceType.name}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {s.prices}
                                                </td>
                                                <td className="py-4 px-6 ">
                                                    <label
                                                        htmlFor=""
                                                        className="rounded-full dark:text-gpy-2 px-3 text-sm font-medium text-white bg-lime-500"
                                                    ></label>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={s}
                                                        type="button"
                                                        onClick={() => {
                                                            addServiceAvailable(s.id, s.name, 1);
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
                </div>
            </div>
        </div>
    );
}
export default CreateOptionRoomManager;
