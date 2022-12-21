import { Button, Checkbox, DatePicker, Divider, Input, InputNumber, Modal, Radio, Select, Switch, Table } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingCircleCheck, faCircleExclamation, faCircleXmark, faPersonWalkingArrowRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import ListRoom from "../../../ListRoom/listRoom";
import { UserOutlined, SearchOutlined, CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Loading from "~/pages/Loading/loading";
import { toast } from 'react-toastify';

function Paid() {

    //Data
    const [listBookingPaid, setListBookingPaid] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalListRoom, setOpenModalListRoom] = useState(false);
    const [openModalCheckIn, setOpenModalCheckIn] = useState(false);
    const [dataBooking, setDataBooking] = useState();
    const [dataBill, setDataBill] = useState();
    const [roomBookingList, setRoomBookingList] = useState();
    const [queryCustomerName, setQueryCustomerName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const genders = [
        { value: 'Nam', label: 'Nam' },
        { value: 'Nữ', label: 'Nữ' },
    ];
    const [nationalityList, setNationalityList] = useState();
    const columns = [
        { title: 'Tên khách hàng', dataIndex: 'customerName', key: '1',
            render: (customerName, element) => (
                <div className="font-semibold">
                    {customerName}
                    {element.bookingStatus === 1 && (
                        <span className="text-white font-semibold rounded-lg bg-status-2 px-2 py-1 ml-3">
                            {element.bookingStatus === 1 && "Mới"}
                        </span>
                    )}
                    {/* {element.bookingStatus === 2 && (
                        <span className="text-white font-bold rounded-lg bg-status-1 px-2 py-1 ml-3">
                            {element.bookingStatus === 2 && (<CheckOutlined />)}
                        </span>
                    )} */}
                </div>
            )
        },
        { title: 'Số điện thoại', dataIndex: 'customerPhoneNumber', key: '2'},
        { title: 'Email', dataIndex: 'customerEmail', key: '3'},
        { title: 'Loại phòng', dataIndex: 'kindOfRoom', key: '4',
            render: (kindOfRoom) => (
                <span>
                    {kindOfRoom.name}
                </span>
            )
        },
        { title: 'Số lượng phòng', dataIndex: 'quantityRoom', key: '12',},
        { title: 'Ngày đến', dataIndex: 'hireDate', key: '5'},
        // { title: 'Trạng thái', dataIndex: 'bookingStatus', key: '13',
        //     render: (bookingStatus) => (
        //         <div className="w-full">
        //             <span className={`rounded-full w-full px-3 py-1 text-white ${bookingStatus === 1 ? 'bg-status-2' : 'bg-status-4'}`}>
        //                 {bookingStatus === 1 ? "Mới" : "Đã xếp phòng"}
        //             </span>
        //         </div>
        //     )
        // },
        // { title: 'Số người lớn', dataIndex: 'numberOfAdults', key: '8'},
        // { title: 'Số trẻ em', dataIndex: 'numberOfKids', key: '9'},
        // { title: 'Tiền thanh toán', dataIndex: 'deposits', key: '10',
        //     render: (deposits) => (
        //         <span>
        //             {formatCurrency(deposits)}
        //         </span>
        //     )
        // },
        { title: '', dataIndex: '', key: '11',
            render: (element) => (
                <span onClick={() => showModal(element)}>
                    <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="hover:text-design-greenLight cursor-pointer"
                    ></FontAwesomeIcon>
                </span>
            ),
        },
    ];
    const columnsRoomBookingList = [
        { title: 'Phòng', dataIndex: 'customerName', key: '1',
            render: (_, x) => (
                <span>
                    {x.rooms.name}
                </span>
            )
        },
        { title: 'Loại phòng', dataIndex: 'customerName', key: '4',
            render: (_, x) => (
                <span>
                    {x.rooms.kindOfRoom.name}
                </span>
            )
        },
        { title: 'Nhận phòng', dataIndex: 'hireDate', key: '2' },
        { title: 'Trả phòng', dataIndex: 'checkOutDay', key: '3' },
        { title: '', dataIndex: '', key: '4',
            render: (x) => (
                <span
                    className="flex justify-center items-center hover:text-status-2 cursor-pointer"
                    onClick={() => deleteBookingRoom(x.id)}
                >
                    <FontAwesomeIcon className="w-5 h-5" icon={faCircleXmark}></FontAwesomeIcon>
                </span>
            )
        },
    ];
    const [chooseDateNow, setChooseDateNow] = useState(true);
    const [chooseNew, setChooseNew] = useState(false);
    const [chooseDone, setChooseDone] = useState(false);
    //End Data

    //Created
    useEffect(() => {
        getListBookingPaid();
        getAllNationality();
    }, [])
    useEffect(() => {
        if(dataBooking) {
            getBillByBooking(dataBooking.id)
            getRoomBookingList(dataBooking.id);
        }
    }, [dataBooking])
    //End Created

    //Gen Data
    const genNationality = () => {
        const array = [];
        if(nationalityList) {
            nationalityList.forEach((element) => {
                array.push({ value: element.id, label: element.name });
            });
        }
        return array;
    };

    const genListBookingPaidFilter = () => {
        let data = "";
        if(listBookingPaid) {
            data = listBookingPaid;
            data = data.filter(
                (x) => x
                    .customerName
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(queryCustomerName.toLowerCase().replace(/\s+/g, ''))
            )
        }
        return data;
    }

    const genBookingPaidListFilter = () => {
        let data = "";
        if(listBookingPaid) {
            data = listBookingPaid;
            data = data.filter(
                (x) => x
                    .customerName
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(queryCustomerName.toLowerCase().replace(/\s+/g, ''))
            )
            if(chooseDateNow) {
                data = data.filter(
                    (x) => x.hireDate === dayjs(new Date()).format("YYYY-MM_DD")
                )
            }
            if(chooseDone) {
                data = data.filter(
                    (x) => x.bookingStatus === 2
                )
            }
            if(chooseNew) {
                data = data.filter(
                    (x) => x.bookingStatus === 1
                )
            }
        }
        return data;
    }
    //End Gen Data

    //Function
    const getListBookingPaid = async () => {
        await axios
            .get('http://localhost:8080/api/booking/get-list-booking-paid')
            .then(res => {
                setListBookingPaid(res.data);
            })
            .catch(err => {});
    }

    const getBillByBooking = async (idBooking) => {
        await axios
            .get('http://localhost:8080/api/booking/get-bill-by-booking/' + idBooking)
            .then(res => {
                setDataBill(res.data);
            })
            .catch(err => {});
    }

    const getRoomBookingList = async (idBooking) => {
        await axios
            .get('http://localhost:8080/api/booking/get-room-booking-list/' + idBooking)
            .then(res => {
                setRoomBookingList(res.data);
            })
            .catch(err => {});
    }

    const getAllNationality = async () => {
        await axios
            .get('http://localhost:8080/api/nationality')
            .then(res => {
                setNationalityList(res.data);
            }).catch(err => {});
    }

    const showModal = (value) => {
        setDataBooking(value);
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
        setDataBooking();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDataBooking();
    };

    const showModalListRoom = () => {
        setOpenModalListRoom(true);
    };

    const handleOkListRoom = () => {
        setOpenModalListRoom(false);
    };

    const handleCancelListRoom = () => {
        setOpenModalListRoom(false);
    };

    const checkInBooking = async () => {

        const params = {
            dataBill: {
                ...dataBill,
                booking: {
                    ...dataBill.booking,
                    status: 2,
                },
                status : 1,
            },
            roomBookingList: roomBookingList.map(
                (x) => ({
                    ...x,
                    status: 1,
                })
            ),
        }

        await axios
            .post('http://localhost:8080/api/booking/check-in-booking', params)
            .then((res) => {
                console.log(res);
                getListBookingPaid();
                setOpenModalCheckIn(false);
                isModalOpen(false);
            })
            .catch((err) => {});
    }

    const deleteBookingRoom = async (idDetailInvoice) => {
        setIsLoading(true);
        await axios
            .get('http://localhost:8080/api/booking/delete-booking-room/' + idDetailInvoice)
            .then((res) => {
                if(res.data === "SUCCESS") {
                    setRoomBookingList(
                        roomBookingList.filter(
                            (x) => x.id !== idDetailInvoice
                        )
                    )
                    setTimeout(() => {
                        setIsLoading(false);
                        toast.success('🦄 Xóa phòng đặt thành công!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }, 500);
                }
            })
            .catch((err) => {});
    }
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString(
            'it-IT',
            {
                style : 'currency',
                currency : 'VND'
            }
        );
    };
    //End Util

    return (
        <>
            {isLoading && (<Loading></Loading>)}
            <Modal 
                title={"Chi tiết booking"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ top: 20 }}
            >
                <div className="text-base">
                    <div className="my-2">
                        Tên khách hàng: {dataBooking && dataBooking.customerName}
                    </div>
                    <div className="my-2">
                        Số điện thoại: {dataBooking && dataBooking.customerPhoneNumber}
                    </div>
                    <div className="my-2">
                        Email: {dataBooking && dataBooking.customerEmail}
                    </div>
                    <div className="my-2">
                        Loại phòng book: {dataBooking && dataBooking.kindOfRoom.name}
                    </div>
                    <div className="my-2">
                        Ngày đến: {dataBooking && dataBooking.hireDate}
                    </div>
                    <div className="my-2">
                        Ngày đi: {dataBooking && dataBooking.checkOutDay}
                    </div>
                    <div className="my-2">
                        Số người lớn: {dataBooking && dataBooking.numberOfAdults}
                    </div>
                    <div className="my-2">
                        Số trẻ em: {dataBooking && dataBooking.numberOfKids}
                    </div>
                    <div className="my-2">
                        Tiền đã thanh toán: {dataBooking && formatCurrency(dataBooking.deposits)}
                    </div>

                    <Divider orientation="left">
                        <span className="font-semibold mr-3">
                            {roomBookingList && roomBookingList.length > 0 ? "Phòng" : "Chưa xếp phòng"}
                            <Button
                                className="px-2.5 ml-2"
                                onClick={() => showModalListRoom()}
                            >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </span>
                    </Divider>

                    {roomBookingList && roomBookingList.length > 0 && (
                        <Table
                            size="middle"
                            locale={{emptyText: "Chưa xếp phòng nào!"}}
                            bordered
                            pagination={false}
                            columns={columnsRoomBookingList}
                            dataSource={roomBookingList}
                        />
                    )}
                    
                    {/* {roomBookingList && roomBookingList.map(
                        (x) => (
                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-11 text-base font-semibold border rounded-md py-1 px-2 mb-2 flex items-center">
                                    <div className="border-r-2 border-design-charcoalblack pr-1">
                                        {x.rooms.name}
                                    </div>
                                    <div className="ml-1">
                                        <FontAwesomeIcon
                                            icon={faBuildingCircleCheck}
                                            className="w-[14px] h-[14px] bg-design-charcoalblack rounded-full text-white p-1"
                                        ></FontAwesomeIcon>
                                    </div>
                                    <div className="border-r-2 border-design-charcoalblack pr-1 ml-1">
                                        {x.hireDate}
                                    </div>
                                    <div className="ml-1">
                                        <FontAwesomeIcon
                                            icon={faPersonWalkingArrowRight}
                                            className="w-[14px] h-[14px] bg-design-charcoalblack rounded-full text-white p-1"
                                        ></FontAwesomeIcon>
                                    </div>
                                    <div className="ml-1">
                                        {x.checkOutDay}
                                    </div>
                                </div>
                                <div className="col-span-1 text-base font-semibold border rounded-md py-1 px-2 mb-2 cursor-pointer hover:border-design-greenLight hover:text-design-greenLight">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                    ></FontAwesomeIcon>
                                </div>
                            </div>
                        )
                    )} */}

                    {/* <Button
                        type="primary"
                        className="w-full mt-3"
                        onClick={() => showModalListRoom()}
                    >
                        Thêm phòng
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="ml-2"
                        ></FontAwesomeIcon>
                    </Button> */}

                    <Divider
                        style={{ marginBottom: 20, marginTop: 20 }}
                    ></Divider>

                    <Button 
                        type="primary" 
                        className="w-full" 
                        onClick={() => setOpenModalCheckIn(true)}
                    >
                        Khách nhận phòng
                        <FontAwesomeIcon
                            className="ml-2"
                            icon={faBuildingCircleCheck}
                        ></FontAwesomeIcon>
                    </Button>
                </div>
            </Modal>
            <Modal 
                title={"Khách nhận phòng"}
                open={openModalCheckIn}
                onOk={() => checkInBooking()}
                onCancel={() => setOpenModalCheckIn(false)}
                okText="Nhận phòng"
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ top: 20 }}
            >
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Tên khách hàng:
                    </span>
                    <Input
                        className="w-[250px] ml-2"
                        placeholder="Tên khách hàng..."
                        prefix={<UserOutlined />}
                        value={dataBill && dataBill.customer.fullname}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        fullname: e.target.value,
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Ngày sinh:
                    </span>
                    <DatePicker
                        className="w-[250px] ml-2"
                        format="DD-MM-YYYY"
                        value={
                            dataBill && dataBill.customer.dateOfBirth
                            ? dayjs(dataBill.customer.dateOfBirth)
                            : ''
                        }
                        onChange={
                            (date, dateString) => {
                                var newdate = dateString.split('-').reverse().join('-');
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        dateOfBirth: dateString === '' ? '' : new Date(Date.parse(newdate)),
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Giới tính:
                    </span>
                    <Select
                        className="w-[250px] ml-2"
                        options={genders}
                        value={
                            dataBill && dataBill.customer.gender
                            ? genders.find((x) => x.value === dataBill.customer.gender)
                            : dataBill && setDataBill({
                                ...dataBill,
                                customer: {
                                    ...dataBill.customer,
                                    gender: genders[0].value,
                                }
                            })
                        }
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        gender: e,
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Quốc tịch:
                    </span>
                    <Select
                        className="w-[250px] ml-2"
                        options={genNationality()}
                        value={
                            dataBill && dataBill.customer.nationality
                            ? genNationality().find((x) => x.value === dataBill.customer.nationality.id).value
                            : dataBill && setDataBill({
                                ...dataBill,
                                customer: {
                                    ...dataBill.customer,
                                    nationality: nationalityList[0],
                                }
                            })
                        }
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        nationality: nationalityList.find((x) => x.id === e),
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Số điện thoại:
                    </span>
                    <Input
                        className="w-[250px] ml-2"
                        placeholder="Số điện thoại..."
                        prefix={<UserOutlined />}
                        value={dataBill && dataBill.customer.phoneNumber}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        phoneNumber: e.target.value,
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Email:
                    </span>
                    <Input
                        className="w-[250px] ml-2"
                        placeholder="Email..."
                        prefix={<UserOutlined />}
                        value={dataBill && dataBill.customer.email}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        email: e.target.value,
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Giấy tờ tùy thân:
                    </span>
                    <Input
                        className="w-[250px] ml-2"
                        placeholder="Giấy tờ tùy thân..."
                        prefix={<UserOutlined />}
                        value={dataBill && dataBill.customer.citizenIdCode}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        citizenIdCode: e.target.value,
                                    }
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Địa chỉ:
                    </span>
                    <Input
                        className="w-[250px] ml-2"
                        placeholder="Địa chỉ..."
                        prefix={<UserOutlined />}
                        value={dataBill && dataBill.customer.address}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    customer: {
                                        ...dataBill.customer,
                                        address: e.target.value,
                                    }
                                })
                            }
                        }
                    />
                </div>

                <Divider
                    style={{ marginBottom: 20, marginTop: 20 }}
                ></Divider>

                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Số người lớn:
                    </span>
                    <InputNumber
                        className="w-[250px] ml-2"
                        placeholder="Số người lớn..."
                        value={dataBill && dataBill.numberOfAdults}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    numberOfAdults: e
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Số người trẻ em:
                    </span>
                    <InputNumber
                        className="w-[250px] ml-2"
                        placeholder="Số người trẻ em..."
                        value={dataBill && dataBill.numberOfKids}
                        onChange={
                            (e) => {
                                setDataBill({
                                    ...dataBill,
                                    numberOfKids: e
                                })
                            }
                        }
                    />
                </div>
                <div className="flex items-center py-2">
                    <span className="w-[120px]">
                        Tiền đặt cọc (Đã thanh toán khi Booking):
                    </span>
                    <InputNumber
                        className="w-[250px] ml-2"
                        placeholder="Tiền đã thanh toán..."
                        disabled
                        value={dataBill && formatCurrency(dataBill.deposits)}
                    />
                </div>

            </Modal>
            <Modal 
                width={1800}
                title={"Sơ đồ phòng"}
                open={openModalListRoom}
                onOk={handleOkListRoom}
                onCancel={handleCancelListRoom}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ top: 20 }}
            >
                <ListRoom
                    optionType={"BOOKING"}
                    openModalListRoom={openModalListRoom}
                    setOpenModalListRoom={setOpenModalListRoom}
                    hireDate={dataBooking && dataBooking.hireDate}
                    kindOfRoomBooking={dataBooking && dataBooking.kindOfRoom.id}
                    dataBooking={dataBooking}
                    setDataBooking={setDataBooking}
                    dataBill={dataBill}
                    setDataBill={setDataBill}
                    roomBookingList={roomBookingList}
                    setRoomBookingList={setRoomBookingList}
                ></ListRoom>
            </Modal>

            <div className="grid grid-cols-2 mb-3">
                <div className="flex items-center">
                    <Checkbox
                        className="mr-3"
                        checked={chooseDateNow}
                        onChange={
                            (e) => setChooseDateNow(e.target.checked)
                        }
                    >Ngày hôm nay ({dayjs(new Date()).format("DD-MM-YYYY")})</Checkbox>
                    <Checkbox
                        className="mr-3"
                        checked={chooseNew}
                        onChange={
                            (e) => setChooseNew(e.target.checked)
                        }
                    >Mới</Checkbox>
                    <Checkbox
                        className="mr-3"
                        checked={chooseDone}
                        onChange={
                            (e) => setChooseDone(e.target.checked)
                        }
                    >Đã xếp phòng</Checkbox>
                    {/* <div className="">Trạng thái</div>
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>Mới</Radio>
                        <Radio value={2}>Đã xếp phòng</Radio>
                    </Radio.Group> */}
                </div>

                <div>
                    <Input
                        className=""
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        value={queryCustomerName}
                        onChange={
                            (e) => {
                                setQueryCustomerName(e.target.value);
                            }
                        }
                    />
                </div>
            </div>

            <Table
                size="middle"
                locale={{emptyText: "Chưa có đơn book nào!"}}
                bordered
                pagination={true}
                columns={columns}
                dataSource={genBookingPaidListFilter()}
            />
        </>
    );
}

export default Paid;