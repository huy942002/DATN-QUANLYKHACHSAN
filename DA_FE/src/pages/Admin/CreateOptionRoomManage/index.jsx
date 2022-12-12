import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAllKindOfRoom } from '~/app/reducers/kindOfRoom';
import { getAllNumberOfFloors, getByIdNumberOfFloorslast, AddNBF } from '~/app/reducers/numberOfFloor';
import { getAllFacility } from '~/app/reducers/facilities';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '~/app/reducers/service';
import { Modal, Label, FileInput } from 'flowbite-react';

import axios from 'axios';

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
        status: '',
    },
    numberOfFloors: {
        id: '',
        numberOfFloors: 0,
        status: '',
    },
};

const dataOption = {
    sl1: 0,
};

const NumberOfFloorss = {
    id: '',
    numberOfFloors: '',
    status: 1,
};

const obj = {
    id: '',
    ServiceAvailables: {
        id: '',
        quantity: '',
        prices: '',
        status: 1,
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
                priceByDay: '',
                hourlyPrice: '',
                status: '',
            },
            numberOfFloors: {
                id: '',
                numberOfFloors: '',
                status: '',
            },
        },
        servicess: {
            id: '',
            name: '',
            prices: '',
            note: '',
            status: '',
            serviceType: {
                id: '',
                name: '',
                note: '',
                status: '',
            },
        },
    },
};

function CreateOptionRoomManager() {
    const [visibleAdd2, setVisibleAdd2] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [Room, setRoom] = useState(objRoom);
    const [roomAdd, setRoomAdd] = useState(objRoom);
    const KindOfRoom = useSelector((state) => state.kindOfRoom.kindOfRoom);
    const NumberOfFloors = useSelector((state) => state.numberOfFloor.numberOfFloors);
    const NumberOfFloor = useSelector((state) => state.numberOfFloor.NumberOfFloor);
    const Facility = useSelector((state) => state.facility.facilities);
    const services = useSelector((state) => state.service.services);
    const [FacilitieDetails, setFacilitieDetails] = useState([]);
    const [ServiceAvailable, setServiceAvailable] = useState([]);
    const [ServiceAvailableUD, setServiceAvailableUD] = useState([obj]);
    const [data2, setData] = useState(dataOption);
    const [NumberOfFlooradd, setNumberOfFloor] = useState(NumberOfFloorss);
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [url, setUrl] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [updatestatus, setupdatestatus] = useState('1');
    const dispatch = useDispatch();

    const addServiceAvailable = (id, value, sl, services) => {
        let obj = {
            id: id,
            quantity: sl,
            prices: value,
            status: 1,
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
                    priceByDay: '',
                    hourlyPrice: '',
                    status: '',
                },
                numberOfFloors: {
                    id: '',
                    numberOfFloors: '',
                    status: '',
                },
            },
            servicess: {
                id: services.id,
                name: services.name,
                prices: services.prices,
                note: services.note,
                status: services.status,
                serviceType: {
                    id: services.serviceType.id,
                    name: services.serviceType.name,
                    note: services.serviceType.note,
                    status: services.serviceType.status,
                },
            },
        };
        setServiceAvailable(() => [...ServiceAvailable, obj]);
    };

    const addFacilitieDetails = (id, value) => {
        let obj = {
            id: id,
            status: '',
            facilities: {
                id: value.id,
                name: value.name,
                status: value.status,
            },
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
                    priceByDay: '',
                    hourlyPrice: '',
                    status: '',
                },
                numberOfFloors: {
                    id: '',
                    numberOfFloors: '',
                    status: '',
                },
            },
        };

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
            console.log(parseInt(NumberOfFloor.numberOfFloors) + 1);
            console.log({ ...NumberOfFlooradd, numberOfFloors: parseInt(NumberOfFloor.numberOfFloors) + 1 });
            dispatch(AddNBF({ ...NumberOfFlooradd, numberOfFloors: parseInt(NumberOfFloor.numberOfFloors) + 1 }));
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
        dispatch(getByIdNumberOfFloorslast());
        dispatch(getAllNumberOfFloors());
        dispatch(getAllKindOfRoom());
        dispatch(getAllFacility());
        dispatch(getAllService());
    }, [roomAdd]);

    useEffect(() => {
        dispatch(getAllNumberOfFloors());
        dispatch(getAllKindOfRoom());
        dispatch(getAllFacility());
        dispatch(getAllService());
    }, []);

    useEffect(() => {
        setRoomAdd(roomAdd);
    }, [data2]);

    // const getNBF = () => {
    //     dispatch(getAllNumberOfFloors());
    // };

    const addRoom = async (data, datasl) => {
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
        // dispatch(addRoomOption({ sl: datasl, roomAdd, FacilitieDetails, ServiceAvailable }));

        const response = await axios
            .post('http://localhost:8080/api/room/Option/' + datasl, {
                rooms: roomAdd,
                facilitiesDetailsList: FacilitieDetails,
                serviceAvailableList: ServiceAvailable,
            })
            .then((res) => {
                if (res) {
                    toast.success('Thêm thành công', { autoClose: 2000 });
                }
            })
            .catch((err) => {
                setTimeout(() => {}, 1000);
            })
            .finally(() => {});
    };

    function getModal() {
        setVisibleAdd(true);
    }

    function getModal2() {
        setVisibleAdd2(true);
    }

    const updateSL = (id1, value) => {
        let array = [...ServiceAvailable];
        array.map((o, i) => {
            if (o.id === id1) {
                array[i] = {
                    id: id1,
                    quantity: value,
                    prices: o.prices,
                    status: o.status,
                    rooms: o.rooms,
                    servicess: o.servicess,
                };
                console.log(array[i]);
            }
        });
        setServiceAvailable([...array]);
    };

    return (
        <div className="text-black p-3">
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
                        <Link to={config.routes.roomManage}>
                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            Quản lý Chi tiết phòng
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} />
                            <span className="px-2">Thêm nhiều phòng phòng</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="mt-8 rounded-full">
                <div>
                    <form className="mx-4 my-4 divide-y-4 divide-slate-400/25">
                        <div className="grid grid-cols-5 gap-4 text-black mb-4">
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Số Phòng muốn tạo :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <input
                                    type="number"
                                    id=""
                                    onChange={(e) => setData({ ...data2, sl1: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Số Tầng :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <input
                                    type="number"
                                    id="nameNBF"
                                    name="nameNBF"
                                    defaultValue={parseInt(NumberOfFloor.numberOfFloors) + 1 || ''}
                                    disabled={true}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=" "
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Tên Phòng :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <input
                                    type="text"
                                    id="nameRoom"
                                    name="nameRoom"
                                    onChange={(e) => setRoomAdd({ ...roomAdd, name: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-4">
                                <span className="font-bold">Loại phòng :</span>
                            </div>
                            <div className="col-span-4 mt-4">
                                <select
                                    name="KindOfRoom"
                                    id="KindOfRoom"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => {
                                        const index = e.target.options[e.target.selectedIndex].id;
                                        setRoomAdd({
                                            ...roomAdd,
                                            kindOfRoom: {
                                                id: KindOfRoom[index].id,
                                                name: KindOfRoom[index].name,
                                                note: KindOfRoom[index].note,
                                                priceByDay: KindOfRoom[index].priceByDay,
                                                hourlyPrice: KindOfRoom[index].hourlyPrice,
                                                status: KindOfRoom[index].status,
                                            },
                                        });
                                        setRoom({
                                            ...Room,
                                            kindOfRoom: {
                                                id: KindOfRoom[index].id,
                                                name: KindOfRoom[index].name,
                                                note: KindOfRoom[index].note,
                                                priceByDay: KindOfRoom[index].priceByDay,
                                                hourlyPrice: KindOfRoom[index].hourlyPrice,
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
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Giá theo ngày:
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <input
                                    type="number"
                                    id=""
                                    defaultValue={Room?.kindOfRoom?.priceByDay || ''}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Giá theo giờ :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <input
                                    type="number"
                                    id=""
                                    defaultValue={Room?.kindOfRoom?.hourlyPrice || ''}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="" className="text-gray-900 dark:text-gray-300 font-bold">
                                    Ảnh :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
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
                            <div className="mt-4">
                                <label htmlFor="" className="mb-2 mt-8 mr-9 text-gray-900 dark:text-gray-300 font-bold">
                                    Ghi Chú :
                                </label>
                            </div>
                            <div className="col-span-4 mt-4">
                                <textarea
                                    id="message"
                                    rows="4"
                                    onChange={(e) => setRoomAdd({ ...roomAdd, note: e.target.value })}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Note..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="text-black">
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
                                            <div className="ml-3 text-sm font-normal">{f.facilities.name}</div>
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
                                                value={s.quantity}
                                                onChange={(e) => {
                                                    updateSL(s.id, e.target.value);
                                                }}
                                                className="w-full h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="vue-checkbox-list"
                                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {s.servicess.name}
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
                        </div>
                        <div className="grid justify-items-end grid-cols-3 gap-4 mt-8 ">
                            <div className="col-span-2 mt-4">
                                <div></div>
                            </div>
                            <div className="mb-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        uploadImage(roomAdd, data2.sl1);
                                        // handleAdd(roomAdd, data2, NBFAdd);
                                    }}
                                    className="py-5 px-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span className="mx-2">THÊM</span>
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
                                                    {fs.status === 1 ? 'Hoạt động' : 'Không tồn tại'}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={fs}
                                                        type="button"
                                                        onClick={() => {
                                                            addFacilitieDetails(fs.id, fs);
                                                        }}
                                                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                                                    {s.status === 1 ? 'Hoạt động' : 'Không tồn tại'}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        value={s}
                                                        type="button"
                                                        onClick={() => {
                                                            addServiceAvailable(s.id, s.prices, 1, s);
                                                        }}
                                                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
