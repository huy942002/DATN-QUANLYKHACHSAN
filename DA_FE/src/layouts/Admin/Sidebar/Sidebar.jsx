import logo from '~/assets/images/logo250x250.png';

import { Link } from 'react-router-dom';
import config from '~/config';

import {
    faClockRotateLeft,
    faHouse,
    faMoneyBillTransfer,
    faPeopleGroup,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar() {
    return (
        <div>
            <div className="flex justify-center items-center">
                <img src={logo} alt="logo" width={200} height={200} />
            </div>

            <aside className="mt-5">
                <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to={config.routes.homeAdmin}
                                className="p-2 block text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faHouse} width={20} />
                                <span className="ml-3">Sơ đồ phòng</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.home}
                                className="p-2 block text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faPeopleGroup} width={20} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Quản lý nhân viên</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.home}
                                className="p-2 block text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faMoneyBillTransfer} width={20} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Quản lý thu chi</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.historyAdmin}
                                className="p-2 block text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faClockRotateLeft} width={20} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Lịch sử đặt phòng</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.home}
                                className="p-2 block text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} width={20} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Đăng xuất</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
