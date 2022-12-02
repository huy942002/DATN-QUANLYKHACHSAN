import { DollarCircleOutlined } from '@ant-design/icons';
import { Divider, DatePicker, Select, Input, Table, Descriptions, Badge, Modal, Drawer, Button, Radio, Space, message } from 'antd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;

function CheckInInformation({ bill, setBill, detailInvoices, serviceDetails, type, open, setOpen }) {

    //Data
    const rentalTypes = useSelector((state) => state.rentalType.rentalTypes);
    const dateNow = new Date();
    const columnDetailInVoice = [
        { title: 'Phòng', dataIndex: 'room', key: '1',
            render: (room, element) => <div onClick={() => changeChooseDetailInvoice(element.roomId)} className='font-semibold cursor-pointer hover:text-design-greenLight'>{room} <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon></div>
        },
        { title: 'Loại hình', dataIndex: 'rentalType', key: '2' },
        { title: 'Tổng thời gian', dataIndex: '', key: '3',
            render: (time, element) => 
                <span>
                    {element.rentalType === "Theo ngày" ? element.day + " (Ngày)" : element.hour + " (Giờ)"}
                </span>
        },
        { title: 'Trạng thái', dataIndex: 'status', key: '4',
            render: (status) => <span>{status}</span>,
        },
        { title: 'Tổng tiền phòng', dataIndex: 'allMoneyRoom', key: '6',
            render: (allMoney) => <span>{formatCurrency(allMoney)}</span>,
        },
        { title: 'Phụ thu', dataIndex: 'surcharge', key: '5',
            render: (surcharge) => <span>{formatCurrency(surcharge)}</span>,
        },
        { title: 'Tổng tiền dịch vụ', dataIndex: 'allMoneyService', key: '7',
            render: (allMoneyService) => <span>{formatCurrency(allMoneyService)}</span>,
        },
    ];
    const columnSerViceByRoom = [
        { title: 'Dịch vụ', dataIndex: 'servicess', key: '1',
            render: (servicess) => <div>{servicess.name}</div>,
        },
        { title: 'Loại dịch vụ', dataIndex: 'servicess', key: '2',
            render: (servicess) => <div>{servicess.serviceType.name}</div>,
        },
        { title: 'Đơn giá', dataIndex: 'servicess', key: '3',
            render: (servicess) => <div>{formatCurrency(servicess.prices)}</div>,
        },
        { title: 'Số lượng', dataIndex: 'quantity', key: '4' },
        { title: 'Tổng tiền', dataIndex: 'totalCash', key: '5',
            render: (totalCash, element) => <div>{formatCurrency(element.servicess.prices * element.quantity)}</div>,
        },
    ];
    const [chooseDetailInvoice, setChooseDetailInvoice] = useState();
    const [showModalDetailInvoice, setShowModalDetailInvoice] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'messageApi';
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = new useNavigate();
    //End Data

    //Created
    //End Created

    //Gen Data
    const genRentalType = () => {
        const array = [];
        rentalTypes.forEach((element) => {
            array.push({ value: element.id, label: element.name });
        });
        return array;
    };
    const genDataTable = () => {
        const array = [];
        let key = 0;
        if(detailInvoices){
            detailInvoices.forEach(element =>{
                const e = {};
                e.roomId = element.rooms.id;
                e.room = element.rooms.name;
                e.rentalType = element.rentalTypes.name;
                e.hour = genHourRental(element.hireDate);
                e.day = genDayRental(element.hireDate);
                e.price = element.rentalTypes.id === 1 ? Number(element.rooms.kindOfRoom.priceByDay) : Number(element.rooms.kindOfRoom.hourlyPrice);
                e.allMoneyRoom = element.rentalTypes.id === 1 ? Number(e.price * e.day) : Number(e.price * e.hour);
                e.allMoneyService = genAllMoneyServiceByRoom(element.rooms.id);
                e.surcharge = genSurchargeByRoom(element.rentalTypes.name, element.checkOutDay, element.rentalTypes.id === 1 ? Number(e.price * e.day) : Number(e.price * e.hour));
                e.status = genStatus(element.rentalTypes.name, element.checkOutDay);
                e.key = key++;
                array.push(e);
            })
        }
        return array;
    }
    const genAllMoneyServiceByRoom = (idRoom) => {
        let allMoneyServiceByRoom = 0;
        serviceDetails.forEach(element => {
            if(element.detailsInvoice.rooms.id === idRoom) {
                allMoneyServiceByRoom += Number(element.quantity * element.servicess.prices)
            }
        })
        return allMoneyServiceByRoom;
    }
    const genAllMoneyService = () => {
        let allMoneyService = 0;
        if(genDataTable()){
            genDataTable().forEach(element => {
                allMoneyService += Number(element.allMoneyService);
            })
        }
        return allMoneyService;
    }
    const genSurcharge = () => {
        let allMoneySurcharge = 0;
        if(genDataTable()){
            genDataTable().forEach(element => {
                allMoneySurcharge += Number(element.surcharge);
            })
        }
        return allMoneySurcharge;
    }
    const genAllMoneyRoom = () => {
        let allMoneyRoom = 0;
        if(genDataTable()){
            genDataTable().forEach(element => {
                allMoneyRoom += Number(element.allMoneyRoom);
            })
        }
        return allMoneyRoom;
    }
    const genAllMoney = () => {
        let allMoney = 0;
        if(genDataTable()){
            genDataTable().forEach(element => {
                allMoney += (Number(element.allMoneyRoom) + Number(element.allMoneyService) + Number(element.surcharge));
            })
        }
        return allMoney;
    }
    const genSurchargeByRoom = (type, dateTimeCheckOut, allMoneyRoom) => {
        let surchargeByRoom = 0;
        let d1 = dateNow.getTime();
        let d2 = new Date(dateTimeCheckOut).getTime();
        if(type === "Theo ngày") {
            if(d1 > d2) {
                surchargeByRoom = allMoneyRoom * 10 / 100;
            }
        }
        return surchargeByRoom;
    }
    const genStatus = (type, dateTimeCheckOut) => {
        let status = "Bình thường";
        let d1 = dateNow.getTime();
        let d2 = new Date(dateTimeCheckOut).getTime();
        if(type === "Theo ngày") {
            if(d1 > d2) {
                status = "Muộn Check out!"
            }
        }
        return status;
    }
    const genDayRental = (dateTimeCheckIn) => {
        let d1 = dateNow.getTime();
        let d2 = new Date(dateTimeCheckIn).getTime();
        return Math.ceil((d1 - d2) / (24*60*60*1000));
    }
    const genHourRental = (dateTimeCheckIn) => {
        let d1 = dateNow.getTime();
        let d2 = new Date(dateTimeCheckIn).getTime();
        return Math.ceil((d1 - d2) / (60*60*1000));
    }
    const genServiceDetailsByRoom = (roomId) => {
        if (serviceDetails)
            return serviceDetails.filter(
                (element) => element.detailsInvoice.rooms.id === roomId && element.quantity !== 0,
            );
    };
    //End Gen Data

    //Function
    const changeTime = (date, dateString) => {
        setBill({ ...bill, hireDate: formatDateTime(dateString[0]), checkOutDay: formatDateTime(dateString[1]) });
    };
    const changeChooseDetailInvoice = (roomId) => {
        setShowModalDetailInvoice(true);
        setChooseDetailInvoice(detailInvoices.find(element => element.rooms.id === roomId));
    }
    const cancelModalDetailInvoice = () => {
        setChooseDetailInvoice();
        setShowModalDetailInvoice(false);
    }
    const pay = async () => {
        let detailInvoiceList = detailInvoices;
        detailInvoiceList.forEach(element => {
            element.numberOfDaysOfRent = genDataTable().find(element2 => element2.roomId === element.rooms.id).day;
            element.numberOfHoursToRent = genDataTable().find(element2 => element2.roomId === element.rooms.id).hour;
            element.totalCash = genAllMoney();
            element.status = 2;
        })
        let serviceDetailList = serviceDetails;
        serviceDetailList.forEach(element => {
            element.status = 2;
        })
        console.log(detailInvoiceList);
        console.log(serviceDetailList);
        const response = await axios.post('http://localhost:8080/api/system-management/pay', {
                detailInvoices: detailInvoiceList,
                serviceDetails: serviceDetailList,
            }).then(res => {
                if(res) {
                    setTimeout(() => {
                        setConfirmLoading(false);
                        messageApi.open({
                            key,
                            type: 'success',
                            content: 'Cập nhật thành công!',
                            duration: 2,
                        });
                    }, 1000);
                    // navigate('/admin');
                }
            }).catch(err => {
                setTimeout(() => {
                    setConfirmLoading(false);
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Lỗi, vui lòng kiểm tra lại!',
                        duration: 2,
                    });
                }, 1000);
            }).finally(() => {
                
            });
    }
    //End Function

    //Util
    const formatNumber = (value) => {
        return value.toLocaleString('fullwide', { useGrouping: false }).replace(/\.0+$/,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    const formatDateTime = (value) => {
        let arrayDateTime = value.split(' ');
        let arrayDate = arrayDateTime[0].split('-');
        return arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0] + ' ' + arrayDateTime[1];
    };
    //End Util

    return <>
        {contextHolder}
        {type === "details" && (
            <Drawer
                title="Thanh toán hóa đơn"
                placement="right"
                width={500}
                onClose={() => setOpen(false)}
                open={open}
                extra={
                    <Space>
                        {dayjs(new Date).format('DD-MM-YYYY HH:mm')}
                    </Space>
                }
            >
                <div className='mb-6'>Khách hàng: <span className='font-semibold ml-3'>{bill.customer && bill.customer.fullname}</span></div>
                <div className='grid grid-cols-2'>
                    <div className='text-left'>
                        <div className=''>
                            Tổng tiền phòng
                        </div>
                        <div className='my-6'>
                            Tổng phụ thu
                        </div>
                        <div className='my-6'>
                            Tổng tiền dịch vụ
                        </div>
                        <div className='my-6'>
                            Tổng tiền
                        </div>
                        <div className='my-6'>
                            Giảm giá
                        </div>
                        <div className='my-6'>
                            Tiền khách cần trả
                        </div>
                        <div className='my-6'>
                            Khách thanh toán
                        </div>
                    </div>
                    <div className='text-right font-semibold'>
                        <div>{formatCurrency(genAllMoneyRoom())}</div>
                        <div className='my-6'>{formatCurrency(genSurcharge())}</div>
                        <div className='my-6'>{formatCurrency(genAllMoneyService())}</div>
                        <div className='my-6'>{formatCurrency(genAllMoney())}</div>
                        <div className='my-6'>0%</div>
                        <div className='my-6'>{formatCurrency(genAllMoney())}</div>
                        <div className='my-6'>
                            <Input></Input>
                        </div>
                    </div>
                </div>
                <div className='my-6'>
                    <Radio.Group defaultValue="tienmat">
                        <Radio value="tienmat">
                            Tiền mặt
                        </Radio>
                        <Radio value="the">
                            Thẻ
                        </Radio>
                        <Radio value="chuyenkhoan">
                            Chuyển khoản
                        </Radio>
                    </Radio.Group>
                </div>
                <Button onClick={() => pay()} type='primary' className='w-full h-auto text-lg font-semibold' loading={confirmLoading}>
                    <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-3"></FontAwesomeIcon>
                    Thanh toán
                </Button>
            </Drawer>
        )}
        <Modal
            title="Hóa đơn chi tiết phòng"
            open={ showModalDetailInvoice }
            cancelButtonProps={{ style: { display: 'none' } }}
            // confirmLoading={confirmLoading}
            onOk={() => cancelModalDetailInvoice()}
            onCancel={() => cancelModalDetailInvoice()}
            okText="Xong"
        >
            {showModalDetailInvoice && (
                <>
                    <Divider orientation="left">
                        <div className="text-base font-semibold">Thông tin phòng</div>
                    </Divider>
                    <div className="mt-3">
                        Phòng: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && chooseDetailInvoice.rooms.name}</span>
                    </div>
                    <div className="mt-3">
                        Loại phòng: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && chooseDetailInvoice.rooms.kindOfRoom.name}</span>
                    </div>
                    <div className="mt-3">
                        Giá theo giờ: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && formatCurrency(chooseDetailInvoice.rooms.kindOfRoom.hourlyPrice)}</span>
                    </div>
                    <div className="mt-3">
                        Giá theo ngày: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && formatCurrency(chooseDetailInvoice.rooms.kindOfRoom.priceByDay)}</span>
                    </div>
                    <Divider orientation="left">
                        <div className="text-base font-semibold">Thông tin thuê phòng</div>
                    </Divider>
                    <div className="mt-3">
                        Số người: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && chooseDetailInvoice.numberOfPeople}</span>
                    </div>
                    <div className="mt-3">
                        Loại hình thuê:  
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && chooseDetailInvoice.rentalTypes.name}</span>
                    </div>
                    <div className="mt-3">
                        Ngày check in: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && formatDateTime(chooseDetailInvoice.hireDate)}</span>
                    </div>
                    <div className="mt-3">
                        Ngày check out (Dự kiến): 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && formatDateTime(chooseDetailInvoice.checkOutDay)}</span>
                    </div>
                    <div className="mt-3">
                        Ngày check out (Thực tế): 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && dayjs(new Date).format('DD-MM-YYYY HH:mm')}</span>
                    </div>
                    <div className="mt-3">
                        Trạng thái: 
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && chooseDetailInvoice.rentalTypes.name === "Theo ngày" ? genStatus(chooseDetailInvoice.rentalTypes.name, chooseDetailInvoice.checkOutDay) : "Bình thường" }</span>
                    </div>
                    <div className="mt-3">
                        Thời gian thuê: 
                        <span className="ml-3 font-semibold">
                            {chooseDetailInvoice && chooseDetailInvoice.rentalTypes.name === "Theo ngày" ? genDayRental(chooseDetailInvoice.hireDate) + " Ngày" : genHourRental(chooseDetailInvoice.hireDate) + " Giờ"}
                        </span>
                    </div>
                    <div className="mt-3">
                        Tổng tiền phòng:
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && genDataTable() && formatCurrency(genDataTable().find(element => element.roomId === chooseDetailInvoice.rooms.id).allMoneyRoom)}</span>
                    </div>
                    <div className="mt-3">
                        Phụ thu:
                        <span className="ml-3 font-semibold">{chooseDetailInvoice && genDataTable() && formatCurrency(genDataTable().find(element => element.roomId === chooseDetailInvoice.rooms.id).surcharge)}</span>
                    </div>
                    <Divider orientation="left">
                        <div className="text-base font-semibold">Thông tin dịch vụ</div>
                    </Divider>
                    <Table 
                        className='mb-6'
                        size="middle"
                        locale={{emptyText: "Chưa có dịch vụ nào!"}}
                        bordered
                        pagination={false}
                        columns={columnSerViceByRoom}
                        dataSource={ chooseDetailInvoice ? genServiceDetailsByRoom(chooseDetailInvoice.rooms.id) : ""}
                        footer={() =>
                        <div className='text-base font-semibold grid grid-cols-2'>
                            <div className='text-left font-normal'>
                                Tổng tiền: 
                            </div>
                            <div className='text-right'>
                                {chooseDetailInvoice && formatCurrency(genAllMoneyServiceByRoom(chooseDetailInvoice.rooms.id))}
                            </div>
                        </div>}
                    />
                </>
            )}
        </Modal>

        {type === "check-in" && (
            <div className="">
            <Divider orientation="left">
                <div className="text-base font-semibold">Thông tin thuê phòng</div>
            </Divider>
            <div className="grid grid-cols-2 gap-6 items-center">
                <div className="col-span-2">
                    <div>Ngày & Giờ Check in/out</div>
                    <RangePicker
                        className="mt-[2px] w-full"
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="DD-MM-YYYY HH:mm"
                        onChange={(date, dateString) => {
                            changeTime(date, dateString);
                        }}
                    />
                </div>
                <div>
                    <div>Loại hình thuê:</div>
                    <Select
                        className="w-full mt-[2px]"
                        defaultValue={genRentalType()[0].value}
                        options={genRentalType()}
                    />
                </div>
                <div>
                    <div>Đặt cọc:</div>
                    <Input
                        onChange={(e) => {
                            setBill({ ...bill, deposits: e.target.value });
                        }}
                        className="mt-[2px]"
                        placeholder="Deposits..."
                        prefix={<DollarCircleOutlined />}
                    />
                </div>
            </div>
        </div>
        )}
        {type === "details" && (
            <div>
                <Divider orientation="left">
                    <div className="text-base font-semibold">Hóa đơn</div>
                </Divider>
                <Table
                    size="middle"
                    bordered
                    pagination={false}
                    columns={columnDetailInVoice}
                    dataSource={genDataTable()}
                    footer={() => 
                        <div className='text-base font-semibold grid grid-cols-2'>
                            <div className='text-left font-normal'>
                                <div>Tổng tiền phòng</div>
                                <div className='mt-3'>Tổng tiền phụ thu</div>
                                <div className='mt-3'>Tổng tiền dịch vụ</div>
                                <div className='mt-3'>Tổng tiền</div>
                            </div>
                            <div className='text-right'>
                                <div>{formatCurrency(genAllMoneyRoom())}</div>
                                <div className='mt-3'>{formatCurrency(genSurcharge())}</div>
                                <div className='mt-3'>{formatCurrency(genAllMoneyService())}</div>
                                <div className='mt-3'>{formatCurrency(genAllMoney())}</div>
                            </div>
                        </div>
                    }
                />
            </div>
        )}
    </>
}

export default CheckInInformation;
