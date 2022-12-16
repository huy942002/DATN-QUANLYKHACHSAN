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
    const [isModalOpenListRoom, setIsModalOpenListRoom] = useState(false);
    const [dataModal, setDataModal] = useState();
    const columns = [
        { title: 'Tên khách hàng', dataIndex: 'customerName', key: '1'},
        { title: 'Số điện thoại', dataIndex: 'customerPhoneNumber', key: '2'},
        { title: 'Email', dataIndex: 'customerEmail', key: '3'},
        { title: 'Loại phòng book', dataIndex: 'kindOfRoom', key: '4',
            render: (kindOfRoom) => (
                <span>{kindOfRoom.name}</span>
            )
        },
        { title: 'Ngày đến', dataIndex: 'hireDate', key: '5'},
        { title: 'Ngày trả phòng', dataIndex: 'checkOutDay', key: '6'},
        { title: 'Số người lớn', dataIndex: 'numberOfAdults', key: '8'},
        { title: 'Số trẻ em', dataIndex: 'numberOfKids', key: '9'},
        { title: 'Tiền thanh toán', dataIndex: 'deposits', key: '10',
            render: (deposits) => (<span>{formatCurrency(deposits)}</span>)
        },
        { title: '', dataIndex: '', key: '11',
            render: (element) => (
                <span onClick={() => {
                    showModal(element);
                }}>
                    <FontAwesomeIcon icon={faCircleExclamation} className="hover:text-design-greenLight cursor-pointer"></FontAwesomeIcon>
                </span>
            ),
        },
    ];

    //End Data

    //Created
    useEffect(() => {
        getListBookingPaid();
    }, [])
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    const getListBookingPaid = async () => {
        await axios.get('http://localhost:8080/api/booking/get-list-booking-paid')
                .then(res => {
                    setListBookingPaid(res.data);
                }).catch(err => {});
    }
    const showModal = (value) => {
        setDataModal(value);
        setIsModalOpen(true);
    };
    
    const handleOk = () => {

        setIsModalOpen(false);
        setDataModal();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDataModal();
    };
    const showModalListRoom = () => {
        setIsModalOpenListRoom(true);
    };
    
    const handleOkListRoom = () => {
        setIsModalOpenListRoom(false);
    };

    const handleCancelListRoom = () => {
        setIsModalOpenListRoom(false);
    };
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
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
            >
                <div className="my-2">Tên khách hàng: {dataModal && dataModal.customerName}</div>
                <div className="my-2">Số điện thoại: {dataModal && dataModal.customerPhoneNumber}</div>
                <div className="my-2">Email: {dataModal && dataModal.customerEmail}</div>
                <div className="my-2">Loại phòng book: {dataModal && dataModal.kindOfRoom.name}</div>
                <div className="my-2">Ngày đến: {dataModal && dataModal.hireDate}</div>
                <div className="my-2">Ngày đi: {dataModal && dataModal.checkOutDay}</div>
                <div className="my-2">Số người lớn: {dataModal && dataModal.numberOfAdults}</div>
                <div className="my-2">Số trẻ em: {dataModal && dataModal.numberOfKids}</div>
                <div className="my-2">Tiền đã thanh toán: {dataModal && formatCurrency(dataModal.deposits)}</div>
                <Divider orientation="left">
                    <span className="font-semibold mr-3">Phòng book</span>
                </Divider>
                <Button type="primary" className="w-full" onClick={() => showModalListRoom()}>
                    {/* <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> */}
                    Thêm phòng
                </Button>
            </Modal>
            <Modal 
                width={1800}
                title={"Sơ đồ phòng"}
                open={isModalOpenListRoom}
                onOk={handleOkListRoom}
                onCancel={handleCancelListRoom}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <ListRoom hireDate={dataModal && dataModal.hireDate}></ListRoom>
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