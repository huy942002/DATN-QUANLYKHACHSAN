import logo from '~/assets/images/logo250x250.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

function LoginAdmin() {
    return (
        <div className="grid grid-cols-3 gap-4 place-content-center p-8 bg-login-hotel bg-cover h-screen">
            <div className="col-start-2 bg-slate-50 p-8 rounded">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="mb-5 text-3xl text-center font-bold text-blue-400">Wellcome</h1>
                <form>
                    <div>
                        <label
                            htmlFor="email-address-icon"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <input
                                type="text"
                                id="email-address-icon"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="password-icon"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <input
                                type="text"
                                id="password-icon"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span>Quên mật khẩu ?</span>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Đăng nhập
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                            type="button"
                            class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55  mb-2"
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                            <span className="mx-2">Facebook</span>
                        </button>
                        <button
                            type="button"
                            class="text-white bg-[#c23616] hover:bg-[#eb4d4b]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mb-2"
                        >
                            <FontAwesomeIcon icon={faGoogle} />
                            <span className="mx-2">Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;
