import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { MonthlyCalendar } from 'react-rainbow-components';

function MonthlyCalendarRoom({openCalendar, setOpenCalendar, roomId, setInOut, dateChoose, room, okBtn}) {

    //Data
    const [listDetailInvoice, setListDetailInvoice] = useState();
    const [initialState, setInitialState] = useState({
        currentMonth: new Date(),
        selectedDate: undefined,
    });
    const [inOutCalendar, setInOutCalendar] = useState({
        hireDate: "",
        checkOutDay: "",
    });
    //End Data

    //Created
    useEffect(() => {
        getAllDetailInVoiceByRoom();
    }, [])
    //End Created

    //Gen Data
    const genDetailInvoice = (value) => {
        let date = moment(value).format("YYYY-MM-DD");
        let detailInvoice = null;
        if(listDetailInvoice) {
            if(listDetailInvoice.find(element => element.hireDate.split(" ")[0] <= date && date <= element.checkOutDay.split(" ")[0] && element.status === 1)){
                detailInvoice = listDetailInvoice.find(element => element.hireDate.split(" ")[0] <= date && date <= element.checkOutDay.split(" ")[0] && element.status === 1);
            }
        }
        return detailInvoice;
    }
    const genBooking = (value) => {
        let date = moment(value).format("YYYY-MM-DD");
        let booking = null;
        if(listDetailInvoice) {
            if(listDetailInvoice.find(element => element.hireDate.split(" ")[0] <= date && date <= element.checkOutDay.split(" ")[0] && element.status === 3)){
                booking = listDetailInvoice.find(element => element.hireDate.split(" ")[0] <= date && date <= element.checkOutDay.split(" ")[0] && element.status === 3);
            }
        }
        return booking;
    }
    const genInOut = (value, hireDate, checkOutDay) => {
        let date = moment(value).format("YYYY-MM-DD");
        let text = null;
        if(hireDate.split(" ")[0] == date) {
            text = "In " + hireDate.split(" ")[1];
        }
        if(checkOutDay.split(" ")[0] == date) {
            text = "Out " + checkOutDay.split(" ")[1];
        }
        return text;
    }
    const genSelected = (value) => {
        let date = moment(value).format("YYYY-MM-DD");
        if(inOutCalendar.hireDate == date) {
            return true;
        }
        if(inOutCalendar.hireDate <= date && inOutCalendar.checkOutDay >= date) {
            return true;
        } else {
            return false;
        }
    }
    //End Gen Data

    //Function
    const getAllDetailInVoiceByRoom = async () => {
        await axios.get('http://localhost:8080/api/room-rental-manage/all-detail-invoice-by-room-and-status/' + roomId)
                .then(res => {
                    setListDetailInvoice(res.data);
                }).catch(err => {});
    }
    const changeInOut = (value) => {
        let date = moment(value).format("YYYY-MM-DD");
        if(!inOutCalendar.hireDate) {
            setInOutCalendar({...inOutCalendar, hireDate: date})
        }
        if(inOutCalendar.hireDate && !inOutCalendar.checkOutDay) {
            setInOutCalendar({...inOutCalendar, checkOutDay: date})
        }
        if(inOutCalendar.hireDate && inOutCalendar.checkOutDay) {
            if(date > inOutCalendar.hireDate) {
                setInOutCalendar({...inOutCalendar, checkOutDay: date})
            }
            if(date < inOutCalendar.hireDate) {
                setInOutCalendar({ hireDate: date, checkOutDay: ""})
            }
            if(date == inOutCalendar.hireDate) {
                setInOutCalendar({ hireDate: "", checkOutDay: ""})
            }
        }
    }
    //End Function

    //Util
    //End Util

    return (
        <>
            <Modal
                title={room.rooms.name}
                centered
                open={openCalendar}
                onOk={() => {okBtn()}}
                onCancel={() => setOpenCalendar(false)}
                okText="Xác nhận"
                cancelText="Hủy"
                width={1800}
            >   
                <MonthlyCalendar
                    id="monthly-calendar-1"
                    currentMonth={initialState.currentMonth}
                    onMonthChange={({ month }) => setInitialState({ currentMonth: month })}
                    onSelectDate={({ date }) => {
                        changeInOut(date);
                    }}
                    minDate={dateChoose ? new Date(dateChoose) : new Date()}
                    dateComponent={date => (
                        <div className='ml-3 mr-1 w-full content-end'>
                            {genDetailInvoice(date) &&(
                                <div>
                                    <span className='bg-status-2 px-3 rounded-full text-white'>
                                        {/* Đã có khách */}
                                        {genDetailInvoice(date).bills.customer.fullname}
                                    </span>
                                    <span className='bg-status-2 px-3 rounded-full text-white ml-1'>
                                        {genInOut(date, genDetailInvoice(date).hireDate, genDetailInvoice(date).checkOutDay)}
                                    </span>
                                </div>
                            )}
                            {/* <div>
                                <span className='bg-design-charcoalblack px-3 rounded-full text-white'>
                                    {genDetailInvoice(date) && genDetailInvoice(date).hireDate + " - " + genDetailInvoice(date).checkOutDay}
                                </span>
                            </div> */}
                            {genBooking(date) && (
                                <div>
                                    <span className='bg-status-4 px-3 rounded-full text-white'>
                                        {/* Khách đặt trước */}
                                        {genBooking(date).bills.customer.fullname}
                                    </span>
                                    {genInOut(date, genBooking(date).hireDate, genBooking(date).checkOutDay) && (
                                        <span className='bg-status-4 px-3 rounded-full text-white ml-1'>
                                            {genInOut(date, genBooking(date).hireDate, genBooking(date).checkOutDay)}
                                        </span>
                                    )}
                                </div>
                            )}
                            {genSelected(date) && (
                                <span className='bg-design-greenLight float-right h-5 w-5 flex justify-center items-center text-white rounded-full'>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                            )} 
                            
                        </div>
                    )}
                />
            </Modal>
        </>
    );
}

export default MonthlyCalendarRoom;
