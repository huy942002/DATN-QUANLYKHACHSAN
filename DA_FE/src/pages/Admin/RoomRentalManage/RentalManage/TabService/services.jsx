import { Divider, Select, Input, Card } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import ServiceDetail from '~/models/ServiceDetail/ServiceDetail';

function Services({ detailInvoices, serviceDetails, setServiceDetails }) {

    //Data
    //End Data

    //Created
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    //End Function

    //Util
    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
    //End Util

    const servicesByServiceType = useSelector((state) => state.serviceByServiceType.servicesByServiceType);
    const serviceType = useSelector((state) => state.serviceType.serviceTypes);
    const genOptionsKindOfRoom = () => {
        const array = [{ value: 'ALL', label: 'ALL' }];
        serviceType.forEach((element) => {
            array.push({ value: element.name, label: element.name });
        });
        return array;
    };
    const [queryServiceType, setQueryServiceType] = useState('ALL');
    const [query, setQuery] = useState('');
    const filterService = () => {
        let filter = servicesByServiceType;
        if (queryServiceType !== 'ALL') {
            filter = servicesByServiceType.filter((element) => element.serviceType === queryServiceType);
        }
        filter = filter.map((element) => ({
            ...element,
            listService: element.listService.filter((element2) => {
                return element2.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''));
            }),
        }));
        return filter;
    };
    const addService = (service) => {
        let array = serviceDetails;
        for (let i = 0; i < detailInvoices.length; i++) {
            if (detailInvoices[i].selected === true) {
                if (array.length === 0) {
                    const newServiceDetail = new ServiceDetail();
                    newServiceDetail.servicess = service;
                    newServiceDetail.detailsInvoice = detailInvoices[i];
                    newServiceDetail.quantity = 1;
                    array = [...array, newServiceDetail];
                    continue;
                } else {
                    let exist = array.find(
                        (element) =>
                            element.servicess.id === service.id &&
                            element.detailsInvoice.rooms.id === detailInvoices[i].rooms.id,
                    );
                    let indexChange = array.findIndex(
                        (element) =>
                            element.servicess.id === service.id &&
                            element.detailsInvoice.rooms.id === detailInvoices[i].rooms.id,
                    );
                    // console.log({ ...check, quantity: check.quantity + 1 });
                    if (exist) {
                        array = array.map((element, index) => {
                            if (index === indexChange) {
                                return { ...element, quantity: element.quantity + 1 };
                            } else {
                                return element;
                            }
                        });
                        continue;
                    } else {
                        const newServiceDetail = new ServiceDetail();
                        newServiceDetail.servicess = service;
                        newServiceDetail.detailsInvoice = detailInvoices[i];
                        newServiceDetail.quantity = 1;
                        array = [...array, newServiceDetail];
                        continue;
                    }
                }
            }
        }
        setServiceDetails(array);
    };

    return (
        <div className="">
            <Divider orientation="left">
                <div className="text-base font-semibold">Dịch vụ</div>
            </Divider>
            <div>
                <div>
                    <div className='text-base font-semibold'>Loại dịch vụ</div>
                    <div className="flex gap-6 mt-[2px]">
                        <Select
                            defaultValue={genOptionsKindOfRoom()[0].value}
                            style={{ width: 150 }}
                            options={genOptionsKindOfRoom()}
                            onChange={(value) => {
                                setQueryServiceType(value);
                            }}
                            className="font-semibold"
                        />
                        <Input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div className="">
                        {filterService().map((element, index) => {
                            return (
                                <div key={index}>
                                    {/* <Divider orientation="left">
                                        <div className="text-base">{element.serviceType}</div>
                                    </Divider> */}
                                    <Card title={element.serviceType} className="text-base mt-3">
                                        <div className='grid grid-cols-4 gap-3'>
                                            {element.listService.map((element2, index) => {
                                                return (
                                                    <div
                                                        className='border border-1 rounded-lg px-3 py-1 hover:border-design-greenLight cursor-pointer select-none'
                                                        onClick={() => {
                                                            addService(element2);
                                                        }}
                                                    >
                                                        <div>{element2.name}</div>
                                                        <div>{formatCurrency(element2.prices)}</div>
                                                    </div>
                                                    // <Card title={element2.name} className="p-0">
                                                    //     {element2.prices}
                                                    // </Card>
                                                    // <Card.Grid
                                                    //     onClick={() => {
                                                    //         addService(element2);
                                                    //     }}
                                                    //     className="cursor-pointer select-none"
                                                    //     key={index}
                                                    //     style={{ width: '50%' }}
                                                    // >
                                                    //     <div>{element2.name}</div>
                                                    //     <div>({element2.prices} VNĐ)</div>
                                                    // </Card.Grid>
                                                    // <div
                                                    //     onClick={() => {
                                                    //         addService(element2);
                                                    //     }}
                                                    //     className="cursor-pointer my-3 hover:bg-default-2 select-none"
                                                    //     key={index}
                                                    // >
                                                    //     {element2.name} - {element2.prices}VNĐ
                                                    // </div>
                                                );
                                            })}
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
