import { Table } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";

function Paid() {

    //Data
    const [listBookingPaid, setListBookingPaid] = useState();
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
            render: () => (
                <span>
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
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    return (
        <>
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