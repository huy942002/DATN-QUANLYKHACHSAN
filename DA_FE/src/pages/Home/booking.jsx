import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Button, DatePicker, Divider, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Booking = () => {

    const { hireDate, checkOutDay, idKindOfRoom, numberOfAdults, numberOfKids, quantityRoom, quantityDay } = useParams();
    const [kindOfRoomList, setKindOfRoomList] = useState();
    const [kindOfRoom, setKindOfRooom] = useState();
    const [openOption, setOpenOption] = useState(false);
    const [timeInOut, setTimeInOut] = useState();
    const dateNow = new Date();
    const dateTomorrow = new Date();
    dateTomorrow.setDate(dateNow.getDate() + 1);
    const days = [];
    for(let i = 1; i <= 30; i++) {
        days.push({
            label: i + " Ngày",
            value: i,
        })
    }
    const [day, setDay] = useState(quantityDay ? quantityDay : days[0].value);
    const [booking, setBooking] = useState({
        customerName: "",
        customerPhoneNumber: "",
        customerEmail: "",
        kindOfRoom: "",
        hireDate: "",
        checkOutDay: "",
        numberOfAdults: 1,
        numberOfKids: 0,
        quantityRoom: 1,
        deposite: "",
        note: "",
        paymentStatus: 1,
        status: 1,
    });

    const getAllKindOfRoom = async () => {
        await axios.get('http://localhost:8080/api/kind-of-room')
                .then(res => {
                    setKindOfRoomList(res.data);
                    setKindOfRooom(res.data[0].id);
                    console.log(res.data);
                    console.log(idKindOfRoom);
                    setBooking({
                        customerName: "",
                        customerPhoneNumber: "",
                        customerEmail: "",
                        kindOfRoom: idKindOfRoom ? res.data.find((x) => x.id === Number(idKindOfRoom)) : res.data[0],
                        hireDate: hireDate ? hireDate : dayjs(dateTomorrow).format('YYYY-MM-DD'),
                        checkOutDay: checkOutDay ? checkOutDay : genCheckOutDay(hireDate ? hireDate : dayjs(dateTomorrow).format('YYYY-MM-DD'), day),
                        numberOfAdults: numberOfAdults ? numberOfAdults : 1,
                        numberOfKids: numberOfKids ? numberOfKids : 0,
                        quantityRoom: quantityRoom ? quantityRoom : 1,
                        deposite: "",
                        note: "",
                        paymentStatus: 1,
                        status: 1,
                    })
                }).catch(err => {});
    }

    const getTimeInOut = async () => {
        await axios
            .get("http://localhost:8080/api/config-time")
            .then((res) => {
                setTimeInOut(res.data);
            })
    }

    const genOptionsKindOfRoom = () => {
        let array = null;
        if(kindOfRoomList) {
            array = kindOfRoomList.map(
                (x) => ({
                    value: x.id, label: x.name
                })
            );
        }
        return array;
    };

    const genCheckOutDay = (valueIn, valueDay) => {
        let dateIn = new Date(valueIn);
        let dateOut = new Date();
        dateOut.setDate(dateIn.getDate() + valueDay);
        return dayjs(dateOut).format('YYYY-MM-DD');
    }

    const formatDateTime = (value) => {
        let date = "";
        if(value) {
            let arrayDate = value.split('-');
            date = arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0];
        }
        return date;
    };

    useEffect(
        () => {
            getAllKindOfRoom();
            getTimeInOut();
        }, []
    )

    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };

    const comfirmBooking = async () => {
        const params = {
            ...booking,
            deposite: (booking.kindOfRoom.priceByDay * booking.quantityRoom * 10 / 100) + (booking.kindOfRoom.priceByDay * booking.quantityRoom),
            paymentStatus: 2,
            status: 1,
        }
        await axios
            .post("http://localhost:8080/api/booking", params)
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <>
            <div className="py-10 px-[440px] text-base">
                <div className='font-bold text-xl'>
                    Đặt phòng khách sạn
                </div>
                <div className='font-medium text-base mt-2'>
                    Điền thông tin người liên lạc và khách bên dưới
                </div>
                <div className="grid grid-cols-12 gap-6 mt-3">
                    <div className="col-span-8">
                        <div className='rounded-lg p-3 grid grid-cols-3 gap-12 shadow-md bg-white'>
                            <div>
                                <div className='font-medium'>
                                    Nhận phòng:
                                </div>
                                <DatePicker
                                    size="large"
                                    className="mt-2 w-full"
                                    format="DD-MM-YYYY"
                                    placeholder="Chọn ngày"
                                    value={booking.hireDate ? dayjs(booking.hireDate) : ""}
                                    onChange={
                                        (date, dateString) => {
                                            setBooking({
                                                ...booking,
                                                hireDate: formatDateTime(dateString),
                                                checkOutDay: genCheckOutDay(formatDateTime(dateString), day),
                                            })
                                        }
                                    }
                                />
                            </div>
                            <div>
                                <div className='font-medium'>
                                    Số ngày:
                                </div>
                                <Select
                                    size='large'
                                    className="w-full mt-2"
                                    options={days}
                                    value={day ? day : days[0].value}
                                    onChange={
                                        (e) => {
                                            setDay(e);
                                            setBooking({
                                                ...booking,
                                                checkOutDay: genCheckOutDay(booking.hireDate, e),
                                            })
                                        }
                                    }
                                />
                            </div>
                            <div>
                                <div className='font-medium'>
                                    Trả phòng:
                                </div>
                                <DatePicker
                                    disabled
                                    size="large"
                                    className="mt-2 w-full"
                                    format="DD-MM-YYYY"
                                    placeholder="Chọn ngày"
                                    value={booking.checkOutDay ? dayjs(booking.checkOutDay) : null}
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='font-medium'>
                                    Người lớn, trẻ em và số phòng:
                                </div>
                                <div
                                    className='mt-2 w-full h-10 border rounded-lg flex items-center pl-3 hover:cursor-pointer hover:border-design-greenLight'
                                    onClick={
                                        () => setOpenOption(!openOption)
                                    }
                                >
                                    {booking.numberOfAdults} người lớn, {booking.numberOfKids} trẻ em, {booking.quantityRoom} phòng
                                </div>
                                <div className={`bg-design-lightGray rounded-lg p-3 mt-2 ${openOption ? "" : "hidden"}`}>
                                    <div className='flex items-center'>
                                        <div className='w-full font-medium'>
                                            Người lớn
                                        </div>
                                        <div className='w-full ml-3 flex items-center justify-end select-none'>
                                            <div
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        if(booking.numberOfAdults >= 2) {
                                                            setBooking({
                                                                ...booking,
                                                                numberOfAdults: Number(booking.numberOfAdults) - 1,
                                                            })
                                                        }
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                            </div>
                                            <div className='h-10 w-10 bg-white border rounded-lg mx-1 flex justify-center items-center font-semibold text-lg'>
                                                {booking.numberOfAdults}
                                            </div>
                                            <div 
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        setBooking({
                                                            ...booking,
                                                            numberOfAdults: Number(booking.numberOfAdults) + 1
                                                        })
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <div className='w-full font-medium'>
                                            Trẻ em
                                        </div>
                                        <div className='w-full ml-3 flex items-center justify-end select-none'>
                                            <div
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        if(booking.numberOfKids >= 1) {
                                                            setBooking({
                                                                ...booking,
                                                                numberOfKids: Number(booking.numberOfKids) - 1
                                                            })
                                                        }
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                            </div>
                                            <div className='h-10 w-10 bg-white border rounded-lg mx-1 flex justify-center items-center font-semibold text-lg'>
                                                {booking.numberOfKids}
                                            </div>
                                            <div
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        setBooking({
                                                            ...booking,
                                                            numberOfKids: Number(booking.numberOfKids) + 1
                                                        })
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <div className='w-full font-medium'>
                                            Số phòng
                                        </div>
                                        <div className='w-full ml-3 flex items-center justify-end select-none'>
                                            <div
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        if(booking.quantityRoom >= 2) {
                                                            setBooking({
                                                                ...booking,
                                                                quantityRoom: Number(booking.quantityRoom) - 1
                                                            })
                                                        }
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                            </div>
                                            <div className='h-10 w-10 bg-white border rounded-lg mx-1 flex justify-center items-center font-semibold text-lg'>
                                                {booking.quantityRoom}
                                            </div>
                                            <div
                                                className='h-10 w-10 bg-white border rounded-lg flex justify-center items-center cursor-pointer hover:bg-default-1 text-design-greenLight'
                                                onClick={
                                                    () => {
                                                        setBooking({
                                                            ...booking,
                                                            quantityRoom: Number(booking.quantityRoom) + 1
                                                        })
                                                    }
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='font-medium'>
                                    Loại phòng:
                                    <Select
                                        size='large'
                                        className="w-full mt-2"
                                        options={genOptionsKindOfRoom()}
                                        value={booking.kindOfRoom ? booking.kindOfRoom.id : genOptionsKindOfRoom() ? genOptionsKindOfRoom()[0].value : ""}
                                        onChange={
                                            (e) => {
                                                setBooking({
                                                    ...booking,
                                                    kindOfRoom: kindOfRoomList.find((x) => x.id === e)
                                                });
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            {/* {hireDate && checkOutDay && (
                                <div className='col-span-3 font-medium'>
                                    Khách đến nhận phòng vào: &nbsp;
                                    <span className='text-red-600 font-semibold'>
                                        {timeInOut && timeInOut[0].timeIn} {dayjs(hireDate).format('DD-MM-YYYY')}
                                    </span>
                                    &nbsp;
                                    và trả phòng vào: &nbsp;
                                    <span className='text-red-600 font-semibold'>
                                        {timeInOut && timeInOut[0].timeOut} {dayjs(checkOutDay).format('DD-MM-YYYY')}
                                    </span>
                                </div>
                            )} */}
                        </div>
                        
                        <div className='font-medium text-base mt-6 mb-2'>
                            Thông tin của bạn
                        </div>
                        <div className='rounded-lg p-3 shadow-md bg-white'>
                            <div className='font-medium'>
                                Tên người liên hệ:
                            </div>
                            <Input
                                size="large"
                                className="mt-2"
                                placeholder="Tên người liên hệ..."
                                prefix={<UserOutlined />}
                                value={booking.customerName}
                                onChange={
                                    (e) => setBooking({
                                        ...booking,
                                        customerName: e.target.value
                                    })
                                }
                            />

                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div>
                                    <div className='font-medium'>
                                        Số điện thoại:
                                    </div>
                                    <Input
                                        size="large"
                                        className="mt-2"
                                        placeholder="Số điện thoại..."
                                        prefix={<UserOutlined />}
                                        value={booking.customerPhoneNumber}
                                        onChange={
                                            (e) => setBooking({
                                                ...booking,
                                                customerPhoneNumber: e.target.value
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <div className='font-medium'>
                                        Email:
                                    </div>
                                    <Input
                                        size="large"
                                        className="mt-2"
                                        placeholder="Email..."
                                        prefix={<UserOutlined />}
                                        value={booking.customerEmail}
                                        onChange={
                                            (e) => setBooking({
                                                ...booking,
                                                customerEmail: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='font-medium text-base mt-6 mb-2'>
                            Chi tiết giá
                        </div>
                        <div className='rounded-lg p-3 shadow-md bg-white grid grid-cols-2'>
                            <div className='font-medium'>
                                Thanh toán ngay
                            </div>
                            <div className="flex justify-end items-center">
                                {formatCurrency(booking.kindOfRoom.priceByDay * booking.quantityRoom)}
                            </div>
                            <div className='font-medium mt-3'>
                                Thuế (10% VAT)
                            </div>
                            <div className="flex justify-end items-center mt-3">
                                {formatCurrency(booking.kindOfRoom.priceByDay * booking.quantityRoom * 10 / 100)}
                            </div>
                            <div className='font-medium mt-3'>
                                Phí phục vụ
                            </div>
                            <div className="flex justify-end items-center mt-3">
                                MIẾN PHÍ
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className='rounded-lg shadow-md bg-white'>
                            <div className="flex items-center p-3">
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg" alt="" />
                                <div className="ml-3">
                                    <div className="font-bold">
                                        POLYTEL
                                    </div>
                                    <div className="font-medium text-sm">
                                        Êm mông - Thoải mái - Thư thái tâm hồn
                                    </div>
                                </div>
                            </div>
                            <div className="bg-default-1 p-3">
                                <div>
                                    Ngày nhận phòng: 
                                    <span className="text-red-600 font-medium ml-2">
                                        {timeInOut && timeInOut[0].timeIn} {dayjs(hireDate).format('DD-MM-YYYY')}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    Ngày trả phòng:
                                    <span className="text-red-600 font-medium ml-2">
                                        {timeInOut && timeInOut[0].timeOut} {dayjs(checkOutDay).format('DD-MM-YYYY')}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-3">
                                <div className="font-semibold">
                                    {"(x" + booking.quantityRoom + ") " + booking.kindOfRoom.name} 
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="mt-3">
                                        <img className="rounded-lg" src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10042556-4db2f0c5d7089b6f88bc52fd5bb3dc16.jpeg?_src=imagekit&tr=h-80,q-40,w-80" alt="" />
                                    </div>
                                    <div className="mt-3">
                                        <div>
                                            Miễn phí ăn sáng
                                        </div>
                                        <div>
                                            Miễn phí wifi
                                        </div>
                                    </div>
                                </div>
                                <Divider style={{marginTop: 10, marginBottom: 10}}></Divider>
                                <div className="font-medium">
                                    Thanh toán trực tiếp
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button
                                size="large"
                                type="primary"
                                className="w-full font-bold text-xl"
                                onClick={
                                    () => {
                                        comfirmBooking();
                                    }
                                }
                            >
                                Đặt phòng & Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Booking;