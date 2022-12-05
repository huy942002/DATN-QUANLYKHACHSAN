import { Link } from 'react-router-dom';
import config from '~/config';

import { faCheck, faChevronRight, faDoorOpen, faTree, faWifi, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllKindOfRoom } from '~/app/reducers/kindOfRoom';
import { addboking } from '~/app/reducers/booking'
// import { getcheckInday, getvalueDay, getCheckOutday } from '~/app/reducers/seach';

import Footer from '~/layouts/Customer/Footer';
import Header from '~/layouts/Customer/Header';

function Booking() {
    const room = useSelector((state) => state.room.room);
    const cutomer = useSelector((state) => state.customer.customer);
    const checkInday = useSelector((state) => state.booking.checkInday2);
    const valueDay = useSelector((state) => state.booking.valueDay2);
    const checkOutday = useSelector((state) => state.booking.CheckOutday2);
    const [booking, setbooking] = useState();
    const dispatch = useDispatch();

    const FacilityDetail = useSelector((state) => state.facilityDetail.facilityDetail);

    useEffect(() => {
        dispatch(getAllKindOfRoom());

    }, []);


    function handleAdd() {
        dispatch(
            addboking({v1:checkInday,v2:checkOutday,v3:room.kindOfRoom.id,v4:cutomer.id})
        );
        toast.success('Đặt phòng thành công!', { autoClose: 2000 });
    }
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
                        <li>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="px-2">Chi tiết phòng</span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="px-2">Booking</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-3 gap-6 mx-36 mt-10">
                <div className="col-start-1 col-end-3 border-2 border-slate-200 rounded-md p-5">
                    <h5 className="font-bold">Thông tin chi tiết phòng</h5>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className="mt-4">
                            <img
                                className="object-cover rounded-md"
                                src={room.img}
                                alt=""
                            />
                        </div>
                        <p className="mt-4">
                            Phòng nghỉ này có Wi-Fi miễn phí trong tất cả các phòng giúp dễ dàng kết nối và đỗ xe miễn phí.
                            Nằm ở vị trí trung tâm tại Nusa Penida của Bali, chỗ nghỉ này đặt quý khách ở gần các điểm thu
                            hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Sacred Monkey Forest Sanctuary
                            nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa,
                            bể bơi ngoài trời và nhà hàng ngay trong khuôn viên.
                        </p>
                    </div>

                    <h5 className="font-bold mt-3">Điểm nhấn nổi bật</h5>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <FontAwesomeIcon icon={faDoorOpen} color="blue" />
                            <span className="mx-2">Nhận phòng 24h</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTree} color="green" />
                            <span className="mx-2">Phong cảnh tuyệt vời</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faWifi} color="red" />
                            <span className="mx-2">Wifi miễn phí</span>
                        </div>
                    </div>
                    <h5 className="font-bold mt-3">Facilities</h5>
                    <div className="grid grid-cols-3 mt-4">
                        {FacilityDetail.map((f) => (
                            <div key={f.id}>
                                <FontAwesomeIcon icon={faWarehouse} color="blue" />
                                <span className="mt-4 mx-3 ">{f.facilities.name}</span>
                            </div>
                        ))}

                    </div>
                    <h5 className="font-bold text-xl text-red-500 mt-6">Giá phòng : {room?.kindOfRoom?.prices_by_day || ''} \1 Đêm</h5>

                </div>
                <div className="border-2 border-slate-200 rounded-md p-5">
                    <h5 className="font-bold">Thông tin người đặt</h5>
                    <div className='mt-4'>
                        <label
                            htmlFor=""
                            className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                        >
                            Contact's name  :
                        </label>
                        <input
                            type="text"
                            id="nameRoom"
                            name="nameRoom"
                            defaultValue={cutomer.fullname || ''}
                            className="w-48 p-1 rounded"
                        />
                    </div>
                    <div className='mt-4'>
                        <label
                            htmlFor=""
                            className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                        >
                            Reachable mobile number  :
                        </label>
                        <input
                            type="text"
                            id="SDT"
                            name="SDT"
                            defaultValue={cutomer.phoneNumber || ''}
                            className="w-48 p-1 rounded"
                        />
                    </div>
                    <div className='mt-4'>
                        <label
                            htmlFor=""
                            className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold"
                        >
                            Contact's email address  :
                        </label>
                        <input
                            type="text"
                            id="SDT"
                            name="SDT"
                            defaultValue={cutomer.email || ''}
                            className="w-48 p-1 rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 mx-36 mt-5">
                <div className="col-start-1 col-end-3">
                    <div className="border-2 border-slate-200 rounded-md p-5">
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <img
                                    className="object-cover h-full rounded-lg"
                                    src={room.img}
                                    alt=""
                                />
                            </div>
                            <div className="col-start-2 col-end-4">
                                <h5 className="font-bold mt-3 mb-2">Lợi ích có sẵn</h5>
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Miễn phí bữa sáng
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Miễn phí hồ bơi
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Miễn phí phòng tập thể dục
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Check in: {checkInday} from 12h00 
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Duration of Stay:{valueDay}
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Check out: {checkOutday} from  12h00
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    className="py-2 px-3 float-right text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <span className="mx-2 block">
                                        <Link to={config.routes.searchRoom}
                                        onClick={() => {
                                            handleAdd();
                                            
                                            }}
                                        >Xác Nhận Thông tin</Link>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Booking;
