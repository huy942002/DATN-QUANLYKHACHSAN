import { Link } from 'react-router-dom';
import config from '~/config';

import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Carousel } from 'flowbite-react';
import Footer from '~/layouts/Customer/Footer';
import Header from '~/layouts/Customer/Header';

function Home() {
    return (
        <div>
            {/* Header */}
            <Header />
            {/* Slider */}
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img
                        src="https://www.vietnambooking.com/wp-content/uploads/2022/02/banner1-dalat.jpg"
                        alt="banner"
                    />
                    <img src="https://www.vietnambooking.com/wp-content/uploads/2017/06/ks_04042022.jpg" alt="banner" />
                    <img
                        src="https://www.vietnambooking.com/wp-content/uploads/2022/02/banner1-nhatrang.jpg"
                        alt="banner"
                    />
                    <img
                        src="https://www.vietnambooking.com/wp-content/uploads/2022/02/banner1-dalat.jpg"
                        alt="banner"
                    />
                    <img src="https://www.vietnambooking.com/wp-content/uploads/2017/06/ks_04042022.jpg" alt="banner" />
                </Carousel>
            </div>
            <div className="text-center">
                <h3 className="font-bold text-xl">Đặt phòng khách sạn trực tuyến</h3>
            </div>
            {/* Filter room */}
            <div className="mt-14 mx-36 p-5 rounded-md bg-slate-100">
                <span className="font-bold">Tìm kiếm phòng trực tuyến giá rẻ</span>
                <div className="grid grid-cols-4 gap-6 mt-4">
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div className="col-start-4">
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
            </div>
            {/* Body */}

            <div className="mt-20 mx-36">
                <div>
                    <h1 className="text-xl font-bold">Đa dạng loại phòng lựa chọn</h1>
                    <h1 className="text-blue-500 font-bold float-right">Xem thêm</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-8">
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link to={config.routes.home}>
                            <img
                                className="rounded-t-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="p-5">
                            <Link to={config.routes.home}>
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Phòng gia đình
                                </h5>
                            </Link>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions in reverse ...
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link to={config.routes.home}>
                            <img
                                className="rounded-t-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="p-5">
                            <Link to={config.routes.home}>
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Phòng gia đình
                                </h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions in reverse ...
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link to={config.routes.home}>
                            <img
                                className="rounded-t-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="p-5">
                            <Link to={config.routes.home}>
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Phòng gia đình
                                </h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions in reverse ...
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link to={config.routes.home}>
                            <img
                                className="rounded-t-lg"
                                src="https://data.vietnambooking.com/business/hotel/bg/hotel_type/can_ho_dich_vu.jpg"
                                alt=""
                            />
                        </Link>
                        <div className="p-5">
                            <Link to={config.routes.home}>
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Phòng gia đình
                                </h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions in reverse ...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 mx-36">
                <div>
                    <h1 className="text-xl font-bold">Trải nghiệm những điều tuyệt vời</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-8">
                    <div>
                        <Link
                            to={config.routes.home}
                            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={config.routes.home}
                            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={config.routes.home}
                            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={config.routes.home}
                            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20 mx-36">
                <div>
                    <h1 className="text-xl font-bold">Tại sao nên đặt phòng tại PolyTel ?</h1>
                </div>
                <div className="mt-5">
                    <p>
                        Khi công nghệ phát triển, chuyến du lịch trở nên dễ dàng hơn nhiều khi việc đặt vé, đặt phòng có
                        thể được thực hiện trực tuyến. Trong đó, PolyTel là nơi đặt phòng khách sạn uy tín, tin cậy hàng
                        đầu dành cho quý khách.
                    </p>
                    <br />
                    <p>
                        PolyTel cung cấp mạng lưới khách sạn rộng khắp với sự lựa chọn chỗ ở lên đến hàng nghìn nơi cho
                        quí khách, song tất cả đều được sắp xếp chỉn chu, phân loại rõ ràng, đảm bảo không khiến quý
                        khách bị "ngộp" hay hoang mang trước quá nhiều sự lựa chọn. Sau nhiều năm hoàn thiện và phát
                        triển, PolyTel tự hào với mạng lưới khách sạn rộng khắp, qua đó mang lại hàng nghìn sự lựa chọn
                        (hơn 2000 khách sạn Việt Nam và 30.000 khách sạn quốc tế) cho khách hàng có nhu cầu.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <div>
                            <p>
                                Khách sạn đối tác của PolyTel trải rộng 63 tỉnh thành của Việt Nam, bất kì nơi nào từ
                                vùng núi cao đến biển đảo xa xôi, chúng tôi đều có thể cung cấp những sự lựa chọn nơi ở
                                giá tốt, chất lượng dành cho quý khách. Những chỗ ở do chúng tôi cung cấp không chỉ bao
                                gồm khu nghỉ dưỡng cao cấp, sang trọng mà còn có những khách sạn, nhà nghỉ bình dân, phù
                                hợp với mọi đối tượng du khách. Từ khu nghỉ dưỡng 5 sao đến nhà nghỉ giá cả phải chăng,
                                chúng tôi đều có cho quý khách những sự lựa chọn chất lượng nhất. Bên cạnh đó, PolyTel
                                còn liên kết với những đối tác khách sạn quốc tế, giúp người du lịch dễ dàng đặt khách
                                sạn online ngay Việt Nam trước khi vi vu sang nước ngoài. Khác với du lịch trong nước,
                                xuất ngoại đòi hỏi quý khách phải chuẩn bị nhiều hơn, lên kế hoạch kĩ càng hơn vì cản
                                trở ngôn ngữ, chưa quen địa điểm,… Chính vì thế, đặt phòng online khách sạn quốc tế từ
                                trang PolyTel giúp bạn có chỗ ở chất
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://www.vietnambooking.com/wp-content/uploads/2020/02/8-tuyet-chieu-dat-khach-san-gia-re-99-nhieu-nguoi-khong-biet-3.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;
