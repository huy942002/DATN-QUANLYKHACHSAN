import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getAllServiceType, getServiceTypeById, update, add } from '~/app/reducers/serviceType';

const objServiceType = {
    name: '',
    note: '',
    status: '',
};

function ServiceTypes() {
    const [visibleDeleteType, setVisibleDeleteType] = useState(false);
    const [visibleUpdateType, setVisibleUpdateType] = useState(false);
    const [visibleAddType, setVisibleAddType] = useState(false);
    const [serviceTypes, setServiceTypes] = useState(objServiceType);
    const [serviceTypesAdd, setServiceTypesAdd] = useState(objServiceType);
    const serviceTypess = useSelector((state) => state.serviceType.serviceTypes);
    const serviceTypee = useSelector((state) => state.serviceType.serviceType);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllServiceType());
        setServiceTypes(serviceTypee);
        // eslint-disable-next-line
    }, [serviceTypee]);

    function openAddType() {
        setVisibleAddType(true);
    }

    function getIdDeleteType(id) {
        dispatch(getServiceTypeById(id));
        setVisibleDeleteType(true);
    }

    function getIdUpdateType(id) {
        dispatch(getServiceTypeById(id));
        setVisibleUpdateType(true);
    }

    function handleDeleteByIdType() {
        setServiceTypes(serviceTypes);
        dispatch(update({ ...serviceTypes, status: '0' }));
        toast.success('Xóa thành công', { autoClose: 2000 });
        setVisibleDeleteType(false);
    }

    function handleUpdateType(dataType) {
        setServiceTypes(dataType);
        dispatch(update(serviceTypes));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        setVisibleUpdateType(false);
    }

    function handleAddType(dataType) {
        setServiceTypesAdd(dataType);
        dispatch(add({ ...serviceTypesAdd, status: '1' }));
        toast.success('Thêm mới thành công', { autoClose: 2000 });
        setVisibleAddType(false);
    }

    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="col-start-6">
                    <button
                        type="button"
                        onClick={() => {
                            openAddType();
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
                                    Tên loại dịch vụ
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ghi chú
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái
                                </th>
                                <th scope="col" className="py-3 px-6" colSpan={2}>
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceTypess.map((x) => (
                                <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {x.id}
                                    </th>
                                    <td className="py-4 px-6">{x.name}</td>
                                    <td className="py-4 px-6">{x.note}</td>
                                    <td className="py-4 px-6">{x.status}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                getIdUpdateType(x.id);
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
                                                getIdDeleteType(x.id);
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
                    <Modal show={visibleDeleteType} size="md" popup={true} onClose={() => setVisibleDeleteType(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận loại dịch vụ ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteByIdType();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteType(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal show={visibleUpdateType} size="4xl" popup={true} onClose={() => setVisibleUpdateType(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Tên loại dịch vụ
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={serviceTypes.name || ''}
                                            onChange={(e) => setServiceTypes({ ...serviceTypes, name: e.target.value })}
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
                                            value={serviceTypes.status || '' === 1 ? 'Hoạt động' : ''}
                                            onChange={(e) =>
                                                setServiceTypes({ ...serviceTypes, status: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
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
                                            value={serviceTypes.note || ''}
                                            onChange={(e) => setServiceTypes({ ...serviceTypes, note: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleUpdateType(serviceTypes);
                                        }}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleUpdateType(false)}>
                                        Đóng
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Modal add */}
                    <Modal show={visibleAddType} size="4xl" popup={true} onClose={() => setVisibleAddType(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Tên loại dịch vụ
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={(e) =>
                                                setServiceTypesAdd({ ...serviceTypesAdd, name: e.target.value })
                                            }
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
                                            value={'1'}
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
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
                                            onChange={(e) =>
                                                setServiceTypesAdd({ ...serviceTypesAdd, note: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleAddType(serviceTypesAdd);
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleAddType(false)}>
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

export default ServiceTypes;
