import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import config from '~/config';
import { faChevronRight, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNumberOfFloor, getNumberOfFloorById, update, add } from '~/app/reducers/numberOfFloor';
import { toast } from 'react-toastify';

const objNumberOfFloor = {
    numberOfFloors: '',
    status: '',
};

const FloorSchema = Yup.object().shape({
    numberOfFloors: Yup.number().typeError('Tầng phải là số').required('Số tầng không được để trống'),
    status: Yup.string().nullable(),
});

function NumberOfFloors() {
    const [visibleDeleteFloor, setVisibleDeleteFloor] = useState(false);
    const [visibleUpdateFloor, setVisibleUpdateFloor] = useState(false);
    const [visibleAddFloor, setVisibleAddFloor] = useState(false);
    const [valueSearchFloor, setValueSearchFloor] = useState('');
    const [numberOfFloors, setNumberOfFloors] = useState(objNumberOfFloor);
    const numberOfFloorss = useSelector((state) => state.numberOfFloor.numberOfFloors);
    const numberOfFloor = useSelector((state) => state.numberOfFloor.numberOfFloor);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNumberOfFloor());
        setNumberOfFloors(numberOfFloor);
        // eslint-disable-next-line
    }, [numberOfFloor]);

    function openAddFloor() {
        setVisibleAddFloor(true);
    }

    function getIdDeleteFloor(id) {
        dispatch(getNumberOfFloorById(id));
        setVisibleDeleteFloor(true);
    }

    function getIdUpdateFloor(id) {
        dispatch(getNumberOfFloorById(id));
        setVisibleUpdateFloor(true);
    }

    function handleDeleteByIdFloor() {
        setNumberOfFloors(numberOfFloors);
        dispatch(update({ ...numberOfFloors, status: '0' }));
        toast.success('Xóa thành công', { autoClose: 2000 });
        setVisibleDeleteFloor(false);
    }

    function handleUpdateFloor(dataFloor) {
        dispatch(update(dataFloor));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        setVisibleUpdateFloor(false);
    }

    function handleAddFloor(dataFloor) {
        dispatch(add({ ...dataFloor, status: '1' }));
        toast.success('Thêm mới thành công', { autoClose: 2000 });
        setVisibleAddFloor(false);
    }

    return (
        <div className="text-black pt-6 px-1 pb-5">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link
                            to={config.routes.homeAdmin}
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} />
                            <span className="px-2">Quản lý Tầng</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-6 gap-3 pt-8 px-3">
                <div className="col-start-1 col-end-7">
                    <hr />
                </div>
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tìm kiếm tầng</p>
                </div>
                <div className="col-start-2 col-end-6">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input
                            type="text"
                            id="email-address-icon"
                            onChange={(e) => setTimeout(() => setValueSearchFloor(e.target.value), 1000)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tìm kiếm..."
                        />
                    </div>
                </div>
                <div className="col-start-6 flex justify-center items-center">
                    <button
                        type="button"
                        onClick={() => {
                            openAddFloor();
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
                                    Tầng
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
                            {numberOfFloorss
                                .filter((x) => x.numberOfFloors.toString().includes(valueSearchFloor))
                                .map((x) => (
                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                        <td className="py-4 px-6">{x.numberOfFloors}</td>
                                        <td className="py-4 px-6">
                                            {x.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getIdUpdateFloor(x.id);
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
                                                    getIdDeleteFloor(x.id);
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
                    <Modal
                        show={visibleDeleteFloor}
                        size="md"
                        popup={true}
                        onClose={() => setVisibleDeleteFloor(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận xóa ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteByIdFloor();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteFloor(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal
                        show={visibleUpdateFloor}
                        size="2xl"
                        popup={true}
                        onClose={() => setVisibleUpdateFloor(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            {(
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        ...numberOfFloors,
                                        numberOfFloors: numberOfFloors.numberOfFloors || '',
                                    }}
                                    validationSchema={FloorSchema}
                                    onSubmit={(values) => {
                                        handleUpdateFloor(values);
                                    }}
                                >
                                    {({ errors, touched, values }) => (
                                        <Form>
                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label
                                                        htmlFor="numberOfFloors"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Tầng
                                                    </label>
                                                    <Field
                                                        name="numberOfFloors"
                                                        className={`
                                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                        ${
                                                            errors.numberOfFloors && touched.numberOfFloors
                                                                ? 'border-2 border-rose-600'
                                                                : ''
                                                        } `}
                                                    />
                                                    {errors.numberOfFloors && touched.numberOfFloors ? (
                                                        <div className="text-sm text-red-600 mt-2">
                                                            {errors.numberOfFloors}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-4 mt-6">
                                                <Button type="submit">Cập nhật</Button>
                                                <Button color="gray" onClick={() => setVisibleAddFloor(false)}>
                                                    Đóng
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            ) || ''}
                        </Modal.Body>
                    </Modal>
                    {/* Modal add */}
                    <Modal show={visibleAddFloor} size="2xl" popup={true} onClose={() => setVisibleAddFloor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <Formik
                                initialValues={objNumberOfFloor}
                                validationSchema={FloorSchema}
                                onSubmit={(values) => {
                                    handleAddFloor(values);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label
                                                    htmlFor="numberOfFloors"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Tầng
                                                </label>
                                                <Field
                                                    name="numberOfFloors"
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${
                                                        errors.numberOfFloors && touched.numberOfFloors
                                                            ? 'border-2 border-rose-600'
                                                            : ''
                                                    } `}
                                                />
                                                {errors.numberOfFloors && touched.numberOfFloors ? (
                                                    <div className="text-sm text-red-600 mt-2">
                                                        {errors.numberOfFloors}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-4 mt-6">
                                            <Button type="submit">Thêm</Button>
                                            <Button color="gray" onClick={() => setVisibleAddFloor(false)}>
                                                Đóng
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default NumberOfFloors;
