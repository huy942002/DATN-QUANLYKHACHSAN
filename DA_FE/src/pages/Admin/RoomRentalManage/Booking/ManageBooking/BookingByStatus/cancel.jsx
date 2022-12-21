import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Form, InputNumber, Modal, Radio, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validateMessages from "~/config/rules";
import Loading from "~/pages/Loading/loading";

const Cancel = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [listBookingCancel, setListBookingCancel] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataBooking, setDataBooking] = useState();
    const [chooseOption, setChooseOption] = useState("PAYMENT");
    const columns = [
        { title: 'Tên khách hàng', dataIndex: 'customerName', key: '1'},
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
        { title: 'Ngày trả phòng', dataIndex: 'checkOutDay', key: '6'},
        { title: 'Số người lớn', dataIndex: 'numberOfAdults', key: '8'},
        { title: 'Số trẻ em', dataIndex: 'numberOfKids', key: '9'},
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
    const [moneyPayment, setMoneyPayment] = useState();
    const [note, setNote] = useState();

    useEffect(() => {
        getListBookingUnPaid();
    }, [])

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

    const getListBookingUnPaid = async () => {
        await axios
            .get('http://localhost:8080/api/booking/get-list-booking-cancel')
            .then(res => {
                setListBookingCancel(res.data);
            })
            .catch(err => {});
    }

    const formatCurrency = (value) => {
        return value.toLocaleString(
            'it-IT',
            {
                style : 'currency',
                currency : 'VND'
            }
        );
    };

    const customerPayment = async () => {
        setIsLoading(true);
        const params = {
            ...dataBooking,
            deposits: moneyPayment,
            paymentStatus: 2,
        }
        await axios
            .post('http://localhost:8080/api/booking', params)
            .then(
                (res) => {
                    if(res) {
                        setTimeout(() => {
                            setIsModalOpen(false);
                            setIsLoading(false);
                        }, 500);
                        getListBookingUnPaid();
                        toast('🦄 Thanh toán thành công!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            )
            .catch((err) => {});
    }

    const cancelBooking = async () => {
        setIsLoading(true);
        const params = {
            ...dataBooking,
            note: note,
            status: 3,
        }
        await axios
            .post('http://localhost:8080/api/booking', params)
            .then(
                (res) => {
                    if(res) {
                        setTimeout(() => {
                            setIsModalOpen(false);
                            setIsLoading(false);
                        }, 500);
                        getListBookingUnPaid();
                        toast('🦄 Hủy đặt phòng thành công!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            )
            .catch((err) => {});
    }

    return (
        <>
            {isLoading && (<Loading></Loading>)}
            <Modal
                title={"Chi tiết đơn hủy"}
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
                        Tiền cần thanh toán: {dataBooking && formatCurrency(dataBooking.moneyToPay ? dataBooking.moneyToPay : 0)}
                    </div>

                    <div className="my-2">
                        Tiền khách đã thanh toán: {dataBooking && formatCurrency(dataBooking.deposits ? dataBooking.deposits : 0)}
                    </div>

                    <div className="my-2">
                        <div className="mb-1">
                            Lý do hủy
                        </div>
                        <TextArea
                            size="large"
                            showCount
                            maxLength={500}
                            style={{ height: 120, resize: 'none' }}
                            className="w-full"
                            placeholder="Ghi chú hủy đặt phòng..."
                            value={dataBooking && dataBooking.note}
                        />
                    </div>
                </div>
            </Modal>

            <Table
                size="middle"
                locale={{emptyText: "Chưa có đơn book nào!"}}
                bordered
                pagination={true}
                columns={columns}
                dataSource={listBookingCancel}
            />
        </>
    )
}

export default Cancel;