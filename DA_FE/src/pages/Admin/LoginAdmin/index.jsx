import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import logo from '~/assets/images/logo250x250.png';
import { toast } from 'react-toastify';

import http from '~/services/apiSevices';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import { post } from '~/app/reducers/loginAdmin';
import { useDispatch, useSelector } from 'react-redux';

const objLogin = {
    username: '',
    password: '',
};

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Tên tài khoản không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
});

function LoginAdmin() {
    const [token, setToken] = useState('');
    const tokens = useSelector((state) => state.loginAdmin.tokens);
    const dispatch = useDispatch();

    useEffect(() => {
        setToken(tokens);
    }, [tokens]);

    function handleLogin(data) {
        dispatch(post(data));
        console.log(token);
        // if (token) {
        //     toast.success('Đăng nhập thành công', { autoClose: 2000 });
        // } else {
        //     toast.error('Sai tên tài và hoặc mật khẩu', { autoClose: 2000 });
        // }
    }

    return (
        <div className="grid grid-cols-3 gap-4 place-content-center p-8 bg-admin-login-hotel bg-cover h-screen">
            <div className="col-start-2 bg-slate-50 p-8 rounded">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="mb-5 text-3xl text-center font-bold text-blue-400">Wellcome</h1>
                <Formik
                    initialValues={objLogin}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Tên đăng nhập
                                </label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <Field
                                        name="username"
                                        type="text"
                                        className={`
                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                        ${errors.username && touched.username ? 'border-2 border-rose-600' : ''} `}
                                    />
                                    {errors.username && touched.username ? (
                                        <div className="text-sm text-red-600 mt-2">{errors.username}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`
                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                        ${errors.password && touched.password ? 'border-2 border-rose-600' : ''} `}
                                    />
                                    {errors.password && touched.password ? (
                                        <div className="text-sm text-red-600 mt-2">{errors.password}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-4">
                                <span>Quên mật khẩu ?</span>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginAdmin;
