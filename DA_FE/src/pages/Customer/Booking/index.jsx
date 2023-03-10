import { Link } from 'react-router-dom';
import config from '~/config';

import { faCheck, faChevronRight, faDoorOpen, faTree, faWifi, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllKindOfRoom } from '~/app/reducers/kindOfRoom';
// import { addboking } from '~/app/reducers/booking'
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
    const [prices, setprices] = useState();
    const [name, setname] = useState(cutomer.fullname);
    const [mobinumber, setmobinumber] = useState(cutomer.phoneNumber);
    const [emailaddress, setaddress] = useState(cutomer.email);
    const [citizenIdCode, setcitizenIdCode] = useState(cutomer.citizenIdCode);

    const dispatch = useDispatch();
    console.log(room.kindOfRoom.priceByDay);
    console.log(valueDay);
    const [price, setUrl] = useState(room.kindOfRoom.priceByDay * valueDay);

    const FacilityDetail = useSelector((state) => state.facilityDetail.facilityDetail);

    const url =
        'http://localhost:8080/booking-pay/' +
        checkInday +
        '/' +
        checkOutday +
        '/' +
        room.kindOfRoom.id +
        '/' +
        cutomer.id +
        '/' +
        name +
        '/' +
        mobinumber +
        '/' +
        emailaddress +
        '/' +
        citizenIdCode +
        '?amount=' +
        price +
        '&bankcode=&language=vi&txt_billing_mobile=Thanh+toan+don+hang&txt_billing_email=' +
        room.email +
        '&txt_billing_fullname=' +
        room.name +
        '%20anh&txt_inv_addr1=ha%20noi&txt_bill_city=ha%20noi&txt_bill_country=viet%20nam&txt_bill_state=ha%20noi&txt_inv_mobile=0389355471&txt_inv_email=quanganhsaker@gmail.com&txt_inv_customer=Nguy%E1%BB%85n%20Van%20A&txt_inv_addr1=ha%20noi&city&txt_inv_company=fsoft&txt_inv_taxcode=10&cbo_inv_type=other&vnp_OrderType=other&vnp_OrderInfo=order%20info%20test';
    console.log(url);
    useEffect(() => {
        dispatch(getAllKindOfRoom());
    }, []);

    function handleAdd() {
        window.open(
            url,
            'mywindow',
            'location=1,status=1,scrollbars=1, resizable=1, directories=1, toolbar=1, titlebar=1',
        );
    }
    return (
        <div>
            <Header />
            <div className="mx-36 mt-5 p-2 bg-slate-200 rounded-md">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to={config.routes.home} className="ml-1 text-sm">
                                Trang ch???
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="px-2">T??m ki???m ph??ng</span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="px-2">Chi ti???t ph??ng</span>
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
                    <h5 className="font-bold">Th??ng tin chi ti???t ph??ng</h5>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="mt-4">
                            <img className="object-cover rounded-md" src={room.img} alt="" />
                        </div>
                        <p className="mt-4">
                            Ph??ng ngh??? n??y c?? Wi-Fi mi???n ph?? trong t???t c??? c??c ph??ng gi??p d??? d??ng k???t n???i v?? ????? xe mi???n
                            ph??. N???m ??? v??? tr?? trung t??m t???i Nusa Penida c???a Bali, ch??? ngh??? n??y ?????t qu?? kh??ch ??? g???n c??c
                            ??i???m thu h??t v?? t??y ch???n ??n u???ng th?? v???. ?????ng r???i ??i tr?????c khi gh?? th??m Sacred Monkey Forest
                            Sanctuary n???i ti???ng. ???????c x???p h???ng 4 sao, ch??? ngh??? ch???t l?????ng cao n??y cho ph??p kh??ch ngh??? s???
                            d???ng m??t-xa, b??? b??i ngo??i tr???i v?? nh?? h??ng ngay trong khu??n vi??n.
                        </p>
                    </div>

                    <h5 className="font-bold mt-3">??i???m nh???n n???i b???t</h5>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <FontAwesomeIcon icon={faDoorOpen} color="blue" />
                            <span className="mx-2">Nh???n ph??ng 24h</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTree} color="green" />
                            <span className="mx-2">Phong c???nh tuy???t v???i</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faWifi} color="red" />
                            <span className="mx-2">Wifi mi???n ph??</span>
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
                    <h5 className="font-bold text-xl text-red-500 mt-6">
                        Gi?? ph??ng : {room?.kindOfRoom?.priceByDay || ''} \1 ????m
                    </h5>
                </div>
                <div className="border-2 border-slate-200 rounded-md p-5">
                    <h5 className="font-bold">Th??ng tin ng?????i ?????t</h5>
                    <div className="mt-4">
                        <label htmlFor="" className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                            T??n ng?????i nh???n ph??ng :
                        </label>
                        <input
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                            type="text"
                            id="nameRoom"
                            name="nameRoom"
                            defaultValue={cutomer.fullname || ''}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                            S??? ??i???n tho???i :
                        </label>
                        <input
                            onChange={(e) => {
                                setmobinumber(e.target.value);
                            }}
                            type="text"
                            id="SDT"
                            name="SDT"
                            defaultValue={cutomer.phoneNumber || ''}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                            ?????a ch??? Email :
                        </label>
                        <input
                            onChange={(e) => {
                                setaddress(e.target.value);
                            }}
                            type="text"
                            id="SDT"
                            name="SDT"
                            defaultValue={cutomer.email || ''}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">
                            S??? ch???ng minh th?? :
                        </label>
                        <input
                            onChange={(e) => {
                                setcitizenIdCode(e.target.value);
                            }}
                            type="text"
                            id="SDT"
                            name="SDT"
                            defaultValue={cutomer.citizenIdCode || ''}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 mx-36 mt-5">
                <div className="col-start-1 col-end-3">
                    <div className="border-2 border-slate-200 rounded-md p-5">
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <img className="object-cover h-full rounded-lg" src={room.img} alt="" />
                            </div>
                            <div className="col-start-2 col-end-4">
                                <h5 className="font-bold mt-3 mb-2">L???i ??ch c?? s???n</h5>
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Mi???n ph?? b???a s??ng
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Mi???n ph?? h??? b??i
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} color="green" className="mr-2" />
                                        Mi???n ph?? ph??ng t???p th??? d???c
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
                                        Check out: {checkOutday} from 12h00
                                    </li>
                                </ul>
                                <button
                                    onClick={() => handleAdd()}
                                    type="button"
                                    className="py-2 px-3 float-right text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    X??c Nh???n Th??ng tin
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
