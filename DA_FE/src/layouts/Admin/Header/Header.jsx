import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import config from '~/config';

import { toast } from 'react-toastify';

import { Dropdown, Avatar, Modal, Button } from 'flowbite-react';

import auth from '~/services/authoServices';

import { faBell, faMoon, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHandOver, update } from '~/app/reducers/handOver';

const objConfirm = {
    moneyReal: '',
    note: '',
};

const ConfirmSchema = Yup.object().shape({
    moneyReal: Yup.number().typeError('Tiền phải là số').required('Tiền thực nhận không được để trống'),
    note: Yup.string().required('Ghi chú không được để trống'),
});

function Header() {
    const [notice, setNotice] = useState(false);
    const handOvers = useSelector((state) => state.handOver.handOvers);
    const userLogin = handOvers
        .filter((x) => x.status === 0)
        .reduce((prev, current) => (prev.dateTimeStart > current.dateTimeStart ? prev : current), {});
    const index = handOvers.findIndex((x) => x === userLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHandOver());
        // eslint-disable-next-line
    }, []);

    function showNotice() {
        setNotice(true);
    }

    function handleConfirm(data) {
        console.log(userLogin);
        console.log(data);
        dispatch(update({ ...userLogin, note: userLogin.note + '. ' + data.note, moneyReal: Number(data.moneyReal) }));
        toast.success('Nhận ca thành công', { autoClose: 2000 });
    }

    return (
        <div>
            <div className="grid grid-cols-4 p-2 bg-slate-800">
                <div className="col-start-2">
                    <FontAwesomeIcon icon={faPhone} />
                    <span className="px-2">Hotline : 1900 000 000</span>
                </div>
                <div className="col-start-3 flex justify-center items-center text-xl">
                    <button onClick={showNotice}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                    <FontAwesomeIcon icon={faMoon} className="mx-5" />
                </div>
                {/* Modal delete */}
                <Modal show={notice} size="3xl" popup={true} onClose={() => setNotice(false)}>
                    <Modal.Header>
                        <div className="p-3">Thông báo giao ca</div>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={objConfirm}
                            validationSchema={ConfirmSchema}
                            onSubmit={(values) => {
                                handleConfirm(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-start-1 col-end-3 text-blue-500">{userLogin.note}</div>
                                        <div className="col-start-1 col-end-3">
                                            <p>
                                                Số tiền mặt bàn giao ca :
                                                {handOvers[index - 1]?.moneyHandOver.toLocaleString()}đ
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="moneyReal"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Tiền thực nhận
                                            </label>
                                            <Field
                                                name="moneyReal"
                                                className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${
                                                        errors.moneyReal && touched.moneyReal
                                                            ? 'border-2 border-rose-600'
                                                            : ''
                                                    } `}
                                            />
                                            {errors.moneyReal && touched.moneyReal ? (
                                                <div className="text-sm text-red-600 mt-2">{errors.moneyReal}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="note"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Ghi chú
                                            </label>
                                            <Field
                                                as="textarea"
                                                name="note"
                                                className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${errors.note && touched.note ? 'border-2 border-rose-600' : ''} `}
                                            />
                                            {errors.note && touched.note ? (
                                                <div className="text-sm text-red-600 mt-2">{errors.note}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <Button type="submit">Xác nhận</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
                <div className="col-start-4">
                    <div className="flex items-center space-x-4">
                        <Dropdown
                            label={<Avatar alt="User settings" img="https://i.pravatar.cc/400" rounded={true} />}
                            arrowIcon={false}
                            inline={true}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">Bonnie Green</span>
                                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Link to={config.routes.home}>Dashboard</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Sign out</Dropdown.Item>
                        </Dropdown>
                        <div className="font-medium dark:text-white">
                            <div>{auth.currentUser}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
