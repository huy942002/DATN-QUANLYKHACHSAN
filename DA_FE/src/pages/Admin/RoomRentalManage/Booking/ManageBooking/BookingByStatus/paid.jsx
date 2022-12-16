import { Button, Divider, Modal, Table } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import ListRoom from "../../../ListRoom/listRoom";

function Paid() {

    //Data
    const [listBookingPaid, setListBookingPaid] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalListRoom, setOpenModalListRoom] = useState(false);
    const [dataBooking, setDataBooking] = useState();
    const [dataBill, setDataBill] = useState();
    const [roomBookingList, setRoomBookingList] = useState();
    const columns = [
        { title: 'Tên khách hàng', dataIndex: 'customerName', key: '1'},
        { title: 'Số điện thoại', dataIndex: 'customerPhoneNumber', key: '2'},
        { title: 'Email', dataIndex: 'customerEmail', key: '3'},
        { title: 'Loại phòng book', dataIndex: 'kindOfRoom', key: '4',
            render: (kindOfRoom) => (
                <span>
                    {kindOfRoom.name}
                </span>
            )
        },
        { title: 'Ngày đến', dataIndex: 'hireDate', key: '5'},
        { title: 'Ngày trả phòng', dataIndex: 'checkOutDay', key: '6'},
        { title: 'Số người lớn', dataIndex: 'numberOfAdults', key: '8'},
        { title: 'Số trẻ em', dataIndex: 'numberOfKids', key: '9'},
        { title: 'Tiền thanh toán', dataIndex: 'deposits', key: '10',
            render: (deposits) => (
                <span>
                    {formatCurrency(deposits)}
                </span>
            )
        },
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

    //End Data

    //Created
    useEffect(() => {
        getListBookingPaid();
    }, [])
    useEffect(() => {
        if(dataBooking) {
            getBillByBooking(dataBooking.id)
            getRoomBookingList(dataBooking.id);
        }
    }, [dataBooking])
    //End Created

    //Gen Data
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
            <Modal 
                title={"Chi tiết booking"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ top: 20 }}
            >
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
                    <span className="font-semibold mr-3">Phòng book</span>
                </Divider>
                
                {roomBookingList && roomBookingList.map(
                    (x) => (
                        <div className="text-base font-semibold border rounded-md py-1 px-2">
                            {x.rooms.name}: {x.hireDate} -> {x.checkOutDay}
                        </div>
                    )
                )}

                <Button type="primary" className="w-full" onClick={() => showModalListRoom()}>
                    {/* <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> */}
                    Thêm phòng
                </Button>
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
            <Table
                size="middle"
                locale={{emptyText: "Chưa có đơn book nào!"}}
                bordered
                pagination={false}
                columns={columns}
                dataSource={listBookingPaid ? listBookingPaid : ""}
            />
        </>
    );
}

export default Paid;