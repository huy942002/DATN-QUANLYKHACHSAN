import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService, getServiceById, update, add } from '~/app/reducers/service';
import { getAllServiceType } from '~/app/reducers/serviceType';

const objService = {
    name: '',
    prices: '',
    note: '',
    status: '',
    serviceType: {
        id: '',
        name: '',
        note: '',
        status: '',
    },
};

function Services() {
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [service, setService] = useState(objService);
    const [serviceAdd, setServiceAdd] = useState(objService);

    const services = useSelector((state) => state.service.services);
    const servic = useSelector((state) => state.service.service);
    const serviceType = useSelector((state) => state.serviceType.serviceTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllService());
        // eslint-disable-next-line
        dispatch(getAllServiceType());
        // eslint-disable-next-line
        setService(servic);
    }, [servic]);

    function openAdd() {
        setVisibleAdd(true);
    }

    function getIdUpdate(id) {
        dispatch(getServiceById(id));
        setVisibleUpdate(true);
    }
    function getIdDelete(id) {
        dispatch(getServiceById(id));
        setVisibleDelete(true);
    }

    function handleDeleteById() {
        setService(service);
        dispatch(update({ ...service, status: '0' }));
        setVisibleDelete(false);
    }

    function handleUpdate(data) {
        setService(data);
        dispatch(update(service));
        setVisibleUpdate(false);
    }

    function handleAdd(data) {
        setServiceAdd(data);
        if (serviceAdd.serviceType.id === '') {
            dispatch(add({ ...serviceAdd, status: '1', serviceType: serviceType[0] }));
        } else {
            dispatch(add({ ...serviceAdd, status: '1' }));
        }
        setVisibleAdd(false);
    }

    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="col-start-6">
                    <button
                        type="button"
                        onClick={() => {
                            openAdd();
                        }}
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="mx-2">Thêm</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Tên dịch vụ
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Giá
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ghi chú
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Loại dịch vụ
                                </th>
                                <th scope="col" className="py-3 px-6" colSpan={2}>
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((x) => (
                                <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {x.id}
                                    </th>
                                    <td className="py-4 px-6">{x.name}</td>
                                    <td className="py-4 px-6">{x.prices}</td>
                                    <td className="py-4 px-6">{x.note}</td>
                                    <td className="py-4 px-6">{x.status}</td>
                                    <td className="py-4 px-6">{x.serviceType.name}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                getIdUpdate(x.id);
                                            }}
                                            className="py-2 px-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            <span className="mx-2">Sửa</span>
                                        </button>
                                    </td>
                                    <td className="py-4 px-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                getIdDelete(x.id);
                                            }}
                                            className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            <span className="mx-2">Xóa</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Modal delete */}
                    <Modal show={visibleDelete} size="md" popup={true} onClose={() => setVisibleDelete(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận xóa dịch vụ ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteById();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDelete(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal show={visibleUpdate} size="4xl" popup={true} onClose={() => setVisibleUpdate(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Tên dịch vụ
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={service.name || ''}
                                            onChange={(e) => setService({ ...service, name: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="prices"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Giá
                                        </label>
                                        <input
                                            type="prices"
                                            id="prices"
                                            name="prices"
                                            value={service.prices || ''}
                                            onChange={(e) => setService({ ...service, prices: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Trạng thái
                                        </label>
                                        <input
                                            type="text"
                                            id="status"
                                            name="status"
                                            disabled
                                            value={service.status || '' === 1 ? 'Hoạt động' : ''}
                                            onChange={(e) => setService({ ...service, status: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="serviceType"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Loại dịch vụ
                                        </label>
                                        <select
                                            name="serviceType"
                                            id="serviceType"
                                            value={service?.serviceType?.name || ''}
                                            className="w-full p-1 rounded"
                                            onChange={(e) => {
                                                const index = e.target.options[e.target.selectedIndex].id;
                                                setService({
                                                    ...service,
                                                    serviceType: {
                                                        id: serviceType[index].id,
                                                        name: serviceType[index].name,
                                                        note: serviceType[index].note,
                                                        status: serviceType[index].status,
                                                    },
                                                });
                                            }}
                                        >
                                            {serviceType.map((x, index) => (
                                                <option key={x.id} value={x.name} id={index}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-start-1 col-end-3">
                                        <label
                                            htmlFor="note"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ghi chú
                                        </label>
                                        <textarea
                                            type="text"
                                            id="note"
                                            rows={5}
                                            name="note"
                                            value={service.note || ''}
                                            onChange={(e) => setService({ ...service, note: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleUpdate(service);
                                        }}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleUpdate(false)}>
                                        Đóng
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Modal add */}
                    <Modal show={visibleAdd} size="4xl" popup={true} onClose={() => setVisibleAdd(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Tên dịch vụ
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={(e) => setServiceAdd({ ...serviceAdd, name: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="prices"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Giá
                                        </label>
                                        <input
                                            type="prices"
                                            id="prices"
                                            name="prices"
                                            onChange={(e) => setServiceAdd({ ...serviceAdd, prices: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Trạng thái
                                        </label>
                                        <input
                                            type="text"
                                            id="status"
                                            name="status"
                                            value={1}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="serviceType"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Loại dịch vụ
                                        </label>
                                        <select
                                            name="serviceType"
                                            id="serviceType"
                                            className="w-full p-1 rounded"
                                            onChange={(e) => {
                                                const index = e.target.options[e.target.selectedIndex].id;
                                                setServiceAdd({
                                                    ...serviceAdd,
                                                    serviceType: {
                                                        id: serviceType[index].id,
                                                        name: serviceType[index].name,
                                                        note: serviceType[index].note,
                                                        status: serviceType[index].status,
                                                    },
                                                });
                                            }}
                                        >
                                            {serviceType.map((x, index) => (
                                                <option key={x.id} value={x.name} id={index}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-start-1 col-end-3">
                                        <label
                                            htmlFor="note"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ghi chú
                                        </label>
                                        <textarea
                                            type="text"
                                            id="note"
                                            rows={5}
                                            name="note"
                                            onChange={(e) => setServiceAdd({ ...serviceAdd, note: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleAdd(serviceAdd);
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleAdd(false)}>
                                        Đóng
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Services;
