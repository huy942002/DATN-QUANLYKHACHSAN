import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, SyncOutlined, InfoOutlined, InfoCircleTwoTone, InfoCircleFilled } from '@ant-design/icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, DatePicker, Divider, InputNumber, Select, Skeleton, Avatar } from 'antd';
import Meta from 'antd/es/card/Meta';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;

function RoomDetail({ detailInvoice, detailInvoiceList, setDetailInvoices, showModalDetailInvoice, setDetailModalDetailInvoice, showModalRoomDetail }) {
    
    //Data
    const dateNow = new Date();
    const rentalTypes = useSelector((state) => state.rentalType.rentalTypes);
    //End Data

    //Created
    useEffect(() => {
        setDetailInvoices(
            detailInvoiceList.map((element) => {
                if (element.rooms.id === detailInvoice.rooms.id && !element.rentalTypes && !element.hireDate && !element.checkOutDay) {
                    return {
                        ...element,
                        rentalTypes: rentalTypes[0],
                        hireDate: '2022-11-21 12:00',
                        checkOutDay: '2022-11-22 12:00',
                    };
                } else {
                    return element;
                }
            }),
        );
    }, []);
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    
    const chooseDetailModalDetailInvoice = async (type) => {
        await setDetailModalDetailInvoice(detailInvoice);
        if(type === "edit") {
            showModalDetailInvoice();
        }
        if(type === "detail") {
            showModalRoomDetail();
        }
    }
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    const formatDateTime = (value) => {
        let arrayDateTime = value.split(' ');
        let arrayDate = arrayDateTime[0].split('-');
        return arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0] + ' ' + arrayDateTime[1];
    };
    const genDayRental = (value) => {
        let d1 = dateNow.getTime();
        let d2 = new Date(value).getTime();
        return Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000));
    };

    const genHourRental = (value) => {
        let d1 = dateNow.getTime();
        let d2 = new Date(value).getTime();
        return (d1 - d2) / (60 * 60 * 1000);
    };
    //End Util

    return (
        <div className='text-base'>
            <Card
                actions={[
                    <EditOutlined onClick={ () => chooseDetailModalDetailInvoice("edit") } key="edit" />,
                    <InfoCircleFilled onClick={ () => chooseDetailModalDetailInvoice("detail") } key="detail"/>,
                    <SyncOutlined key="change"/>
                ]}
            >
                <div className='flex items-center'>
                    <div className='bg-design-greenLight rounded-full p-2 text-white h-10 w-10 flex justify-center items-center'>
                        <FontAwesomeIcon icon={faBed} ></FontAwesomeIcon>
                    </div>
                    <div className='ml-3'>
                        <div className='text-lg font-semibold'>{detailInvoice.rooms.name}</div>
                        <div className='text-base'>{detailInvoice.rooms.kindOfRoom.name}</div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                    </div>
                    <div className='ml-3 text-base'>
                        Loại hình thuê:&nbsp;
                        <span className='font-semibold'>
                            { detailInvoice.rentalTypes ? detailInvoice.rentalTypes.name : "" }
                        </span>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                    </div>
                    <div className='ml-3 text-base'>
                        Ngày & Giờ Check in:&nbsp;
                        <span className='font-semibold'>
                            { detailInvoice.hireDate ? moment(detailInvoice.hireDate).format("DD-MM-YYYY HH:mm") : "" }
                        </span>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='rounded-full p-2 h-10 w-10 text-white flex justify-center items-center'>
                    </div>
                    <div className='ml-3 text-base'>
                        Ngày & Giờ Check out:&nbsp;
                        <span className='font-semibold'>
                            { detailInvoice.hireDate ? moment(detailInvoice.checkOutDay).format("DD-MM-YYYY HH:mm") : "" }
                        </span>
                    </div>
                </div>
                {/* <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={detailInvoice.rooms.name}
                    description={detailInvoice.rooms.kindOfRoom.name}
                /> */}
            </Card>
            {/* <Divider orientation="left">
                <div className="text-base font-semibold">{detailInvoice.rooms.name}</div>
            </Divider>
            <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center">
                    <div>Loại phòng:</div>
                    <div className="ml-2 font-semibold">{detailInvoice.rooms.kindOfRoom.name}</div>
                </div>
                <div></div>
                <div className="flex items-center">
                    <div>Giá theo ngày:</div>
                    <div className="ml-2 font-semibold">{detailInvoice.rooms.kindOfRoom.priceByDay} VNĐ</div>
                </div>
                <div className="flex items-center">
                    <div>Giá theo giờ:</div>
                    <div className="ml-2 font-semibold">{detailInvoice.rooms.kindOfRoom.hourlyPrice} VNĐ</div>
                </div>
                <div className="">
                    <div>Số người: </div>
                    <div className="w-full">
                        <InputNumber
                            onChange={(e) => {
                                changeNumberOfPeople(e.target.value);
                            }}
                            defaultValue={detailInvoice.numberOfPeople}
                            className="w-full"
                            placeholder="Số người..."
                        ></InputNumber>
                    </div>
                </div>
                <div>
                    <div>Loại hình thuê:</div>
                    <div className="w-full">
                        <Select
                            onChange={(e) => {
                                changeRentalType(e);
                            }}
                            className="w-full mt-[2px]"
                            value={
                                detailInvoice.rentalTypes
                                    ? genRentalType().find((element) => element.value === detailInvoice.rentalTypes.id)
                                          .value
                                    : genRentalType()[0].value
                            }
                            options={genRentalType()}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="">Ngày & Giờ Check in/out: </div>
                    <div className="w-full">
                        <RangePicker
                            className="w-full"
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="DD-MM-YYYY HH:mm"
                            onChange={(date, dateString) => {
                                changeTime(date, dateString);
                            }}
                            value={
                                detailInvoice.hireDate && detailInvoice.checkOutDay
                                    ? [dayjs(detailInvoice.hireDate), dayjs(detailInvoice.checkOutDay)]
                                    : ''
                            }
                        />
                    </div>
                </div>
                <div className="flex content-start h-full">
                    <div>Trang thiết bị:&nbsp;</div>
                    <div>
                        {detailInvoice.facilitiesDetailsList.map((element) => {
                            return <div> - {element.facilities.name}</div>;
                        })}
                    </div>
                </div>
                <div className="flex content-start h-full">
                    <div>Mini Bar:&nbsp;</div>
                    <div>
                        {detailInvoice.serviceAvailableList.map((element) => {
                            return <div> - {element.servicess.name}</div>;
                        })}
                    </div>
                </div>
                <div className="col-span-2">Số ngày thuê: {genDayRental(detailInvoice.hireDate)}</div>
                <div className="col-span-2">Số giờ thuê: {genHourRental(detailInvoice.hireDate)}</div>
            </div> */}
        </div>
    );
}

export default RoomDetail;
