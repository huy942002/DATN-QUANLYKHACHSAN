import { Link } from 'react-router-dom';
import config from '~/config';

import { faBed, faCalendarDays, faChevronRight, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '~/layouts/Customer/Header';
import Footer from '~/layouts/Customer/Footer';

function SearchRoom() {
    return (
        <div>
            <Header />
            <div className="mx-36 mt-5 p-2 bg-slate-200 rounded-md">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to={config.routes.home} className="ml-1 text-sm">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="px-2">Tìm kiếm phòng</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="grid grid-cols-3 gap-10 mx-36 mt-10">
                <div className="p-6 shadow-md h-fit">
                    <h5 className="font-bold">Tìm kiếm phòng</h5>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Ngày nhận phòng
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </div>
                            <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Ngày trả phòng
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </div>
                            <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Số phòng
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faBed} />
                            </div>
                            <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Số người
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faPerson} />
                            </div>
                            <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="py-2 px-3 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <span className="mx-2">
                                <Link to={config.routes.searchRoom}>Tìm kiếm</Link>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="col-start-2 col-end-4">
                    <h5 className="font-bold">Tìm thấy 50 phòng phù hợp</h5>
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <Link to={config.routes.room}>
                            <img
                                className="object-cover w-full rounded-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="col-start-2 col-end-4 flex flex-col justify-between pl-2 leading-normal">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Moon West Lake Hotel & Residence
                            </h5>
                            <span className="text-blue-500">Giá phòng : 5,000,000đ</span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Lối trang trí kiểu cổ điển của Pháp và kiến trúc Châu Âu là nét đặc trưng của Beryl
                                Palace Hotel and Spa, một chỗ nghỉ boutique nằm trên Phố Cổ Hàng Bông nhộn nhịp.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <Link to={config.routes.room}>
                            <img
                                className="object-cover w-full rounded-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="col-start-2 col-end-4 flex flex-col justify-between pl-2 leading-normal">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Hanoi Center Silk Boutique Hotel & Travel
                            </h5>
                            <span className="text-blue-500">Giá phòng : 5,000,000đ</span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Lối trang trí kiểu cổ điển của Pháp và kiến trúc Châu Âu là nét đặc trưng của Beryl
                                Palace Hotel and Spa, một chỗ nghỉ boutique nằm trên Phố Cổ Hàng Bông nhộn nhịp.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <Link to={config.routes.room}>
                            <img
                                className="object-cover w-full rounded-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="col-start-2 col-end-4 flex flex-col justify-between pl-2 leading-normal">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Beryl Palace Hotel and Spa
                            </h5>
                            <span className="text-blue-500">Giá phòng : 5,000,000đ</span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Lối trang trí kiểu cổ điển của Pháp và kiến trúc Châu Âu là nét đặc trưng của Beryl
                                Palace Hotel and Spa, một chỗ nghỉ boutique nằm trên Phố Cổ Hàng Bông nhộn nhịp.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <Link to={config.routes.room}>
                            <img
                                className="object-cover w-full rounded-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="col-start-2 col-end-4 flex flex-col justify-between pl-2 leading-normal">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Hanoi Center Silk Hotel & Travel
                            </h5>
                            <span className="text-blue-500">Giá phòng : 5,000,000đ</span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Lối trang trí kiểu cổ điển của Pháp và kiến trúc Châu Âu là nét đặc trưng của Beryl
                                Palace Hotel and Spa, một chỗ nghỉ boutique nằm trên Phố Cổ Hàng Bông nhộn nhịp.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <Link to={config.routes.room}>
                            <img
                                className="object-cover w-full rounded-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="col-start-2 col-end-4 flex flex-col justify-between pl-2 leading-normal">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Golden Sun Villa Hotel
                            </h5>
                            <span className="text-blue-500">Giá phòng : 5,000,000đ</span>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Lối trang trí kiểu cổ điển của Pháp và kiến trúc Châu Âu là nét đặc trưng của Beryl
                                Palace Hotel and Spa, một chỗ nghỉ boutique nằm trên Phố Cổ Hàng Bông nhộn nhịp.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-20">
                        <nav aria-label="Page navigation example">
                            <ul className="inline-flex -space-x-px">
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Previous
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        1
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        2
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        3
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        4
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        5
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={config.routes.home}
                                        className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SearchRoom;
