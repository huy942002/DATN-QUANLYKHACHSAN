import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

import { faChevronRight, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllbill, getBillById, updatebill } from '~/app/reducers/bill';
import { getAllPaymentType } from '~/app/reducers/paymenttype';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import { update, getCustomerById } from '~/app/reducers/customer';
import { downloadExcel } from 'react-export-table-to-excel';

const header = [
    'Mã Hóa Đơn',
    'Tên Khách Hàng',
    'Tên Nhân viên tạo đơn',
    'Loại Thanh Toán',
    'Số người lớn',
    'Số trẻ em',
    'Ngày Tạo Hóa Đơn',
    'Ngày trả phòng',
    'Đặt Cọc',
    'Ngày Thanh Toán',
    'Tổng tiền',
    'Trạng thái',
];

const obj = {
    id: '',
    customer: '',
    personnel: '',
    paymentType: '',
    numberOfAdults: '',
    numberOfKids: '',
    hireDate: '',
    checkOutDay: '',
    deposits: '',
    dateOfPayment: '',
    totalCash: '',
    status: '',

}

const BillManage = () => {
    const [visible, setVisible] = useState(false);
    const bills = useSelector((state) => state.bill.bills);
    const bill = useSelector((state) => state.bill.bill);
    const paymenttypes = useSelector((state) => state.paymenttype.paymenttypes);
    const customer = useSelector((state) => state.customer.customer);
    const [itemOffset, setItemOffset] = useState(0);
    const [valueSearch, setValueSearch] = useState('');
    const [billUpdate, setbillUpdate] = useState({});
    const [billExport, setbillExport] = useState([]);
    const [CustomerUpdate, setCustomerUpdate] = useState({});
    const itemsPerPage = 7;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = bills.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(bills.length / itemsPerPage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllbill());
        dispatch(getAllPaymentType());
        setbillUpdate(bill);
        setCustomerUpdate(customer);

    }, [bill])

    useEffect(() => {
        setbillExport(billExport)
    }, [billExport])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % bills.length;
        setItemOffset(newOffset);
    };

    function getModal(id, id2) {
        dispatch(getBillById(id))
        dispatch(getCustomerById(id2))
        setVisible(true);
    }

    function handUpdateBill() {
        dispatch(update(CustomerUpdate));

        dispatch(updatebill(billUpdate));

        toast.success('Update hóa đơn thành công', { autoClose: 2000 });
    }

    function handleDownloadExcel() {
        let array = [];
        for (let index = 0; index < bills.length; index++) {
            const element = bills[index];

            array.push({
                id: element.id,
                customer: element.customer.fullname,
                personnel: element.personnel.fullname,
                paymentType: element.paymentType?.name || 'Chưa kết thức thuê phòng',
                numberOfAdults: element.numberOfAdults,
                numberOfKids: element.numberOfKids,
                hireDate: element.hireDate + '',
                checkOutDay: element.checkOutDay || 'Chưa kết thức thuê phòng',
                deposits: element.deposits,
                dateOfPayment: element.dateOfPayment  || 'Chưa kết thức thuê phòng',
                totalCash: element.totalCash,
                status: element.status === 2 ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'
            });
        }
        console.log(array)


        downloadExcel({
            fileName: 'Quản lý hóa đơn',
            sheet: 'bill-manage',
            tablePayload: {
                header,
                // accept two different data structures
                body: array,
            },
        });
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
                            <span className="px-2">Quản lý Hóa Đơn</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="mt-4 p-2">
                <div>
                    <button
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={handleDownloadExcel}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faFileExcel} />
                        Export
                    </button>
                </div>
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Mã Hóa Đơn
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Tên Khách Hàng
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ngày Tạo Hóa Đơn
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Loại Thanh Toán
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ngày Thanh Toán
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems
                                .map((x) =>
                                (
                                    <tr
                                        key={x.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="py-4 px-6">HD{x.id}</td>
                                        <td className="py-4 px-6">{x.customer.fullname}</td>
                                        <td className="py-4 px-6">{x.hireDate}</td>
                                        <td className="py-4 px-6">{x.paymentType?.name || 'Chưa Thanh Toán'}</td>
                                        <td className="py-4 px-6">{x.dateOfPayment}</td>
                                        <td className="py-4 px-6">{x.status === 2 ? <span className='bg-green-700 text-white'>Đã Thanh Toán</span> : <span className='bg-red-700 text-white'>Chưa Thanh Toán</span>}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getModal(x.id, x.customer.id)
                                                }}
                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            >
                                                <span className="mx-2">Chi Tiết</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">> Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={7}
                        pageCount={pageCount}
                        previousLabel="Prev <<"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active-num"
                    />
                </div>

                <Modal show={visible} position="top-center" size="md" popup={true} onClose={() => setVisible(false)}>
                    <Modal.Header />
                    <Modal.Body>
                        <form>
                            <div className="text-black">
                                <div className='mt-4'>
                                    <label
                                        htmlFor=""
                                        className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                    >
                                        Tên Khách Hàng :
                                    </label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        defaultValue={CustomerUpdate.fullname || ''}
                                        disabled={true}
                                        className="w-96 p-1 rounded"
                                    />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Ngày Tạo Hóa Đơn :
                                </label>
                                <input
                                    type="datetime-local"
                                    id="hireDate"
                                    name="hireDate"
                                    disabled={true}
                                    defaultValue={billUpdate.hireDate || ''}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Ngày Trả Phòng :
                                </label>
                                <input
                                    type="datetime-local"
                                    id="checkOutDay"
                                    name="checkOutDay"
                                    disabled={true}
                                    defaultValue={billUpdate.checkOutDay || ''}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Ngày Thanh toán :
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dateOfPayment"
                                    name="dateOfPayment"
                                    disabled={true}
                                    defaultValue={billUpdate.dateOfPayment || ''}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Số Lượng Người Lớn :
                                </label>
                                <input
                                    type="number"
                                    id="numberOfAdults"
                                    name="numberOfAdults"
                                    disabled={true}
                                    defaultValue={billUpdate.numberOfAdults || 0}
                                    // onChange={(e) => setbillUpdate({ ...billUpdate, numberOfAdults: e.target.value })}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Số Lượng Trẻ Em :
                                </label>
                                <input
                                    type="number"
                                    id="numberOfKids"
                                    name="numberOfKids"
                                    disabled={true}
                                    defaultValue={billUpdate.numberOfKids || 0}
                                    // onChange={(e) => setbillUpdate({ ...billUpdate, numberOfKids: e.target.value })}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Đặt Cọc :
                                </label>
                                <input
                                    type="number"
                                    id="deposits"
                                    name="deposits"
                                    disabled={true}
                                    defaultValue={billUpdate.deposits || 0}
                                    // onChange={(e) => setbillUpdate({ ...billUpdate, deposits: e.target.value })}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className='mt-4'>
                                <label
                                    htmlFor=""
                                    className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                                >
                                    Loại Thanh Toán :
                                </label>
                                <input
                                    type="text"
                                    id="paymentType"
                                    name="paymentType"
                                    disabled={true}
                                    defaultValue={billUpdate.paymentType?.name || 'Chưa Thanh Toán'}
                                    // onChange={(e) => setbillUpdate({ ...billUpdate, deposits: e.target.value })}
                                    className="w-96 p-1 rounded"
                                />

                            </div>

                            <div className="mt-8">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handUpdateBill()
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
            </div>
        </div>


    );
}
export default BillManage;