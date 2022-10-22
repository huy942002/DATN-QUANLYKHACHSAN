import { Link } from 'react-router-dom';
import config from '~/config';

import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, getAllNationality, getAllPersonnel, getPersonnelById, update } from '~/app/reducers/personnel';

import { Button, Modal } from 'flowbite-react';

const objPersonnel = {
    fullname: '',
    email: '',
    gender: '',
    citizenIdCode: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    img: '',
    status: '',
    nationality: {
        id: '',
        name: '',
        status: '',
    },
    users: {
        username: '',
        password: '',
        status: 1,
        roles: [],
    },
};
function PersonnelManage() {
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [person, setPerson] = useState(objPersonnel);
    const [personAdd, setPersonAdd] = useState(objPersonnel);
    const [id, setId] = useState(-1);
    const personnels = useSelector((state) => state.personnel.personnels);
    const nationalities = useSelector((state) => state.personnel.nationalities);
    const personnel = useSelector((state) => state.personnel.personnel);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersonnel());
        dispatch(getAllNationality());
        // eslint-disable-next-line
        setPerson(personnel);
        // eslint-disable-next-line
    }, [personnel]);

    // open the modal delete
    function getIdDelete(id) {
        setId(id);
        dispatch(getPersonnelById(id));
        setVisibleDelete(true);
    }
    // open the modal update
    function getIdUpdate(id) {
        setId(id);
        dispatch(getPersonnelById(id));
        setVisibleUpdate(true);
    }
    // open the modal add
    function openAdd() {
        setVisibleAdd(true);
    }

    function handleDeleteById() {
        setPerson(person);
        dispatch(update({ ...person, status: '0' }));
        dispatch(getAllPersonnel());
        setVisibleDelete(false);
    }

    function handleUpdate(data) {
        setPerson(data);
        dispatch(update(person));
        setVisibleUpdate(false);
    }

    function handleAdd(data) {
        setPersonAdd(data);
        if (personAdd.gender === '' && personAdd.nationality.id === '') {
            // default no change gender and nationality
            dispatch(add({ ...personAdd, gender: 'Nam', nationality: nationalities[0] }));
        } else if (personAdd.gender === '') {
            // default no change gender
            dispatch(add({ ...personAdd, gender: 'Nam' }));
        } else if (personAdd.nationality.id === '') {
            // default no change nationality
            dispatch(add({ ...personAdd, nationality: nationalities[0] }));
        } else {
            dispatch(add(personAdd));
        }
        setVisibleAdd(false);
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
                            <span className="px-2">Quản lý nhân viên</span>
                        </div>
                    </li>
                </ol>
            </nav>

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
                                    Avatar
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Họ tên
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Username
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Email
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Địa chỉ
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Giới tính
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ngày sinh
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    SĐT
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    CCCD/CMTND
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
                            {personnels.map((x) => (
                                <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {x.id}
                                    </th>
                                    <td className="py-4 px-6">
                                        <img
                                            src="https://i.pravatar.cc/100"
                                            alt={x.fullname}
                                            className="rounded-sm"
                                            width={100}
                                        />
                                    </td>
                                    <td className="py-4 px-6">{x.fullname}</td>
                                    <td className="py-4 px-6">{x.users.username}</td>
                                    <td className="py-4 px-6">{x.email}</td>
                                    <td className="py-4 px-6">{x.address}</td>
                                    <td className="py-4 px-6">{x.gender}</td>
                                    <td className="py-4 px-6">{x.dateOfBirth}</td>
                                    <td className="py-4 px-6">{x.phoneNumber}</td>
                                    <td className="py-4 px-6">{x.citizenIdCode}</td>
                                    <td className="py-4 px-6">{x.status}</td>
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
                                    Xác nhận xóa nhân viên ?
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
                    <Modal show={visibleUpdate} size="6xl" popup={true} onClose={() => setVisibleUpdate(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <label
                                            htmlFor="fullname"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Họ tên
                                        </label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={person.fullname || ''}
                                            onChange={(e) => setPerson({ ...person, fullname: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={person.email || ''}
                                            onChange={(e) => setPerson({ ...person, email: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={person.phoneNumber || ''}
                                            onChange={(e) => setPerson({ ...person, phoneNumber: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="citizenIdCode"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            CCCD/CMTND
                                        </label>
                                        <input
                                            type="text"
                                            id="citizenIdCode"
                                            name="citizenIdCode"
                                            value={person.citizenIdCode || ''}
                                            onChange={(e) => setPerson({ ...person, citizenIdCode: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="dateOfBirth"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ngày sinh
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={person.dateOfBirth || ''}
                                            onChange={(e) => setPerson({ ...person, dateOfBirth: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={person.address || ''}
                                            onChange={(e) => setPerson({ ...person, address: e.target.value })}
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
                                            value={person.status || '' === 1 ? 'Hoạt động' : ''}
                                            onChange={(e) => setPerson({ ...person, status: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="img"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ảnh
                                        </label>
                                        <input
                                            type="text"
                                            id="img"
                                            name="img"
                                            value={person.img || ''}
                                            onChange={(e) => setPerson({ ...person, img: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="gender"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Giới tính
                                        </label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={person.gender || ''}
                                            className="w-full p-1 rounded"
                                            onChange={(e) => setPerson({ ...person, gender: e.target.value })}
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleUpdate(person);
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
                    {/* modal add */}
                    <Modal show={visibleAdd} size="6xl" popup={true} onClose={() => setVisibleAdd(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <label
                                            htmlFor="fullname"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Họ tên
                                        </label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            onChange={(e) => setPersonAdd({ ...personAdd, fullname: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={(e) => setPersonAdd({ ...personAdd, email: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            onChange={(e) =>
                                                setPersonAdd({ ...personAdd, phoneNumber: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="citizenIdCode"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            CCCD/CMTND
                                        </label>
                                        <input
                                            type="text"
                                            id="citizenIdCode"
                                            name="citizenIdCode"
                                            onChange={(e) =>
                                                setPersonAdd({ ...personAdd, citizenIdCode: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="dateOfBirth"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ngày sinh
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            onChange={(e) =>
                                                setPersonAdd({ ...personAdd, dateOfBirth: e.target.value })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            onChange={(e) => setPersonAdd({ ...personAdd, address: e.target.value })}
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
                                            onChange={(e) => setPersonAdd({ ...personAdd, status: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            onChange={(e) =>
                                                setPersonAdd({
                                                    ...personAdd,
                                                    users: { ...personAdd.users, username: e.target.value },
                                                })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={(e) =>
                                                setPersonAdd({
                                                    ...personAdd,
                                                    users: { ...personAdd.users, password: e.target.value },
                                                })
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="img"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Ảnh
                                        </label>
                                        <input
                                            type="text"
                                            id="img"
                                            name="img"
                                            onChange={(e) => setPersonAdd({ ...personAdd, img: e.target.value })}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="gender"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Giới tính
                                        </label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="w-full p-1 rounded"
                                            onChange={(e) => setPersonAdd({ ...personAdd, gender: e.target.value })}
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="nationality"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Quốc gia
                                        </label>
                                        <select
                                            name="nationality"
                                            id="nationality"
                                            className="w-full p-1 rounded"
                                            onChange={(e) => {
                                                const index = e.target.options[e.target.selectedIndex].id;
                                                setPersonAdd({
                                                    ...personAdd,
                                                    nationality: {
                                                        id: nationalities[index].id,
                                                        name: nationalities[index].name,
                                                        status: nationalities[index].status,
                                                    },
                                                });
                                            }}
                                        >
                                            {nationalities.map((x, index) => (
                                                <option key={x.id} value={x.name} id={index}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        onClick={() => {
                                            handleAdd(personAdd);
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

export default PersonnelManage;
