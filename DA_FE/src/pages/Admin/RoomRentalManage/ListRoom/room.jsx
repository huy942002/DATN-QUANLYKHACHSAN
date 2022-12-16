import {
    faBuildingCircleCheck,
    faPersonWalkingArrowRight,
    faPersonWalkingLuggage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, message, Modal } from 'antd';
import { useState, React } from 'react'
import MonthlyCalendarRoom from '../Calendar/MonthlyCalendar';

const { confirm } = Modal;


const Room = ({ room, dateChoose }) => {

    //Data
    const [openCalendar, setOpenCalendar] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const key = 'messageApi';
    const [messageApi, contextHolder] = message.useMessage();
    // const [inOut, setInOut] = useState({
    //     hireDate: "",
    //     checkOutDay: "",
    // });
    //End Data

    //Created
    //End Created

    //Gen Data
    const genDetailInvoice = () => {
        let data = null;
        if(room.detailInvoiceList) {
            data = room.detailInvoiceList.find(element => element.status === 1);
        }
        return data;
    }
    const genBooking = () => {
        let data = null;
        if(room.detailInvoiceList) {
            data = room.detailInvoiceList.find(element => element.status === 3);
        }
        return data;
    }

    //End Gen Data

    //Function
    const booking = () => {

    }
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    return (
        <> 
            {contextHolder}
            <div
                onClick={() => {setOpenCalendar(true)}}
                className=' border border-1 text-base p-3 cursor-pointer hover:bg-default-2 hover:border-design-greenLight'
            >
                <div className='flex justify-end font-semibold'>
                    <span className='text-base font-semibold'>{room.rooms.name}</span>
                </div>
                <div className='flex justify-end font-semibold'>
                    {room.rooms.kindOfRoom.name}
                </div>
                <div className={`flex items-center pt-10`}>
                    <span className={`px-3 py-1 rounded-full text-white
                    ${room.rooms.statusByDate === 1 ? "bg-design-greenLight" : ""}
                    ${room.rooms.statusByDate === 2 ? "bg-status-2" : ""}
                    ${room.rooms.statusByDate === 3 ? "bg-status-3" : ""}
                    `}>
                        {room.rooms.statusByDate === 1 && "Sẵn sàng đón khách"}
                        {room.rooms.statusByDate === 2 && "Đang có khách"}
                        {room.rooms.statusByDate === 3 && "Đang dọn dẹp"}
                    </span>
                    <span className='ml-3'>{genDetailInvoice() && genDetailInvoice().bills.customer.fullname}</span>
                </div>
                {genDetailInvoice() && (
                    <>
                        <div className='grid grid-cols-2 pt-3'>
                            <div className='flex items-center'>
                                <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                                </span>
                                <span className='ml-3'>
                                    {genDetailInvoice() && genDetailInvoice().hireDate}
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faBuildingCircleCheck} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                                </span>
                                <span className='ml-3'>
                                    {genDetailInvoice() && genDetailInvoice().checkOutDay}
                                </span>
                            </div>
                        </div>
                    </>
                )}
                {genBooking() && (
                    <>
                        <Divider style={{margin: 12}}/>
                        <div className={`flex items-center w-full`}>
                            <span className={`px-3 py-1 rounded-full text-white bg-status-4`}>
                                Khách đặt trước
                            </span>
                            <span className='ml-3'>{genBooking() && genBooking().bills.customer.fullname}</span> 
                        </div>
                        <div className='flex items-center mt-3'>
                            <span className='rounded-full bg-design-charcoalblack h-7 w-7 text-white p-3 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faPersonWalkingLuggage} className="w-[18px] h-[18px]"></FontAwesomeIcon>
                            </span>
                            <span className='ml-3'>
                                {genBooking() && genBooking().hireDate}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <MonthlyCalendarRoom openCalendar={openCalendar} setOpenCalendar={setOpenCalendar} roomId={room.rooms.id} dateChoose={dateChoose} room={room} okBtn={booking}></MonthlyCalendarRoom>
        </>
    );
}

export default Room;
