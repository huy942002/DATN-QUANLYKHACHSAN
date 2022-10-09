import { Link } from 'react-router-dom';
import config from '~/config';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
    return (
        <div>
            <div className="grid grid-cols-4 p-2 bg-slate-800">
                <div className="col-start-3">
                    <FontAwesomeIcon icon={faPhone} />
                    <span className="px-2">Hotline : 1900 000 000</span>
                </div>
                <div className="col-start-4">
                    <div className="flex items-center space-x-4">
                        {/* without tippy errors */}
                        <div>
                            <Tippy
                                delay={[0, 50]}
                                offset={[12, 8]}
                                interactive
                                render={(attrs) => (
                                    <div
                                        className="w-55 p-2 bg-white text-slate-700 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                            <div>Bonnie Green</div>
                                            <div className="font-medium truncate">name@flowbite.com</div>
                                        </div>
                                        <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="avatarButton"
                                        >
                                            <li>
                                                <Link
                                                    to={config.routes.home}
                                                    className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={config.routes.home}
                                                    className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={config.routes.home}
                                                    className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Earnings
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <Link
                                                to={config.routes.home}
                                                className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Sign out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                placement="bottom"
                            >
                                <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/400" alt="" />
                            </Tippy>
                        </div>
                        <div className="font-medium dark:text-white">
                            <div>Jese Leos</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
