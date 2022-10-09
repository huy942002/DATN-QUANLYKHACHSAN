// import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import config from '~/config';

import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RoomDetailAdmin() {
    // const { information } = useParams();

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
                            <span className="px-2">Chi tiết phòng</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-2 p-8 mt-2 rounded-md bg-blue-300 text-white">
                <div>
                    <h1 className="text-center text-xl">Phòng 101</h1>
                    <div className="mt-1">
                        <span>Loại phòng : Phòng đơn</span>
                    </div>
                    <div className="mt-1">
                        <span>Ngày vào : </span>
                        <input className="text-black p-0.5 rounded-sm" type="date" />
                    </div>
                    <div className="mt-1">
                        <span>Ngày ra : </span>
                        <input className="text-black p-0.5 rounded-sm" type="date" />
                    </div>
                    <div className="mt-2">
                        <span>Trạng thái : </span>
                        <input
                            id="remember"
                            type="radio"
                            value=""
                            name="status"
                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm font-medium">
                            Theo ngày
                        </label>
                        <input
                            id="remember"
                            type="radio"
                            value=""
                            name="status"
                            className="w-4 h-4 mx-2 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm font-medium">
                            Theo giờ
                        </label>
                    </div>
                    <div className="mt-2">
                        <span>Giá phòng : 1,500,000đ</span>
                    </div>
                    <div className="mt-2">
                        <span>Trả trước : 1,000,000đ</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-center text-xl">Thông tin khách hàng</h1>
                    <div className="mt-2">
                        <span>Khách hàng : Nguyễn Văn A</span>
                    </div>
                    <div className="mt-2">
                        <span>Số điện thoại : 0123456789</span>
                    </div>
                    <div className="mt-2">
                        <span>CMND/CCCD : 02379818799</span>
                    </div>
                </div>
                <div className="col-start-1 col-end-3">
                    <hr />
                    <h1 className="text-xl mt-3">Dịch vụ</h1>

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Tên dịch vụ
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Thành tiền
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Xử lý
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Nước ngọt Pepso
                                    </th>
                                    <td className="py-4 px-6">Sliver</td>
                                    <td className="py-4 px-6">Laptop</td>
                                    <td className="py-4 px-6">
                                        <button
                                            type="button"
                                            className="py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Xóa</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Nước ngọt Coca
                                    </th>
                                    <td className="py-4 px-6">White</td>
                                    <td className="py-4 px-6">Laptop PC</td>
                                    <td className="py-4 px-6">
                                        <button
                                            type="button"
                                            className="py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Xóa</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Thêm dịch vụ
                        </button>
                        <button
                            type="button"
                            className="py-2 mx-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetailAdmin;
