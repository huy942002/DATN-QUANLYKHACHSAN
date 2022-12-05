// import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import config from '~/config';

import { faCheckToSlot, faChevronRight, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RoomDetailAdmin() {
    // const { information } = useParams();

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
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} />
                            <span className="px-2">Chi tiết phòng</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-2 p-8 mt-2 rounded-md bg-blue-300 text-white">
                <div>
                    <h1 className="text-xl text-black mb-3">Phòng 101</h1>
                    <div className="mt-1">
                        <span>Tầng : 1</span>
                    </div>
                    <div className="mt-1">
                        <span>Loại phòng : Phòng đơn</span>
                    </div>
                    <div className="mt-1">
                        <span>Ngày vào : 12:20 - 20/12/2022</span>
                    </div>
                    <div className="mt-1">
                        <span>Ngày ra : 13:30 - 22/12/2022</span>
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
                            checked
                            className="w-4 h-4 mx-2 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm font-medium">
                            Theo giờ
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="text-xl text-black mb-3">Thông tin khách hàng</div>
                    <div className="col-start-1">
                        <div className="mt-2">
                            <span>Khách hàng : Nguyễn Văn A</span>
                        </div>
                        <div className="mt-2">
                            <span>Số điện thoại : 0123456789</span>
                        </div>
                        <div className="mt-2">
                            <span>Giới tính : Nam</span>
                        </div>
                        <div className="mt-2">
                            <span>CMND/CCCD : 02379818799</span>
                        </div>
                        <div className="mt-2">
                            <span>Địa chỉ : TVB, Nam Từ Liêm, Hà Nội</span>
                        </div>
                    </div>
                    <div className="col-start-2 flex justify-center items-center">
                        <img src="https://i.pravatar.cc/200" alt="avatar" className="rounded-sm border" />
                    </div>
                </div>
                <div className="col-start-1 col-end-3 pt-3">
                    <hr />
                    <h1 className="text-xl mt-3">Dịch vụ</h1>

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        STT
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Tên dịch vụ
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Đơn giá
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
                                    <td className="py-4 px-6">1</td>
                                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Nước ngọt Pepsi vị cola
                                    </td>
                                    <td className="py-4 px-6">1</td>
                                    <td className="py-4 px-6">23,000đ</td>
                                    <td className="py-4 px-6">23,000đ</td>
                                    <td className="grid grid-cols-2 gap-3 p-3">
                                        <button
                                            type="button"
                                            className="w-28 p-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Xóa</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="w-28 p-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Cập nhật</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <td className="py-4 px-6">2</td>
                                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Nước ngọt Coca vị pepsi
                                    </td>
                                    <td className="py-4 px-6">2</td>
                                    <td className="py-4 px-6">20,000đ</td>
                                    <td className="py-4 px-6">40,000đ</td>
                                    <td className="grid grid-cols-2 gap-3 p-3">
                                        <button
                                            type="button"
                                            className="w-28 p-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Xóa</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="w-28 p-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span className="mx-2">Cập nhật</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-3 space-y-4 mt-4 pt-3">
                        <div className="col-start-1 col-end-4">
                            <hr />
                        </div>
                        <h1 className="col-start-1 col-end-4 text-xl mt-3 mb-3">Thanh toán</h1>
                        <div>
                            <h3>Tiền dịch vụ : 60,000đ</h3>
                        </div>
                        <div>
                            <h3>Tiền phòng : 1,200,000đ</h3>
                        </div>
                        <div>
                            <h3>Đã trả : 500,000đ</h3>
                        </div>
                        <div className="flex">
                            <h3 className="pr-2">Giảm trừ : </h3>
                            <input
                                type="text"
                                className="block w-60 p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex">
                            <h3 className="pr-2">Phụ thu : </h3>
                            <input
                                type="text"
                                className="block w-60 p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex">
                            <h3 className="pr-2">Hình thức thanh toán : </h3>
                            <select name="" id="" className="w-40 p-1 text-black rounded">
                                <option value="">Tiền mặt</option>
                                <option value="">Thẻ</option>
                            </select>
                        </div>
                        <div className="col-start-1 col-end-4">
                            <h1 className="text-black text-2xl font-bold">Tổng tiền : 3,300,000đ</h1>
                        </div>
                        <div className="col-start-1 col-end-4">
                            <h3 className="pb-2">Ghi chú : </h3>
                            <textarea
                                cols="6"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="ml-2">Thêm dịch vụ</span>
                        </button>
                        <button
                            type="button"
                            className="py-2 mx-2 px-3 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            <FontAwesomeIcon icon={faPrint} />
                            <span className="ml-2">In hóa đơn</span>
                        </button>
                        <button
                            type="button"
                            className="py-2 mx-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <FontAwesomeIcon icon={faCheckToSlot} />
                            <span className="ml-2">Thanh toán</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetailAdmin;
