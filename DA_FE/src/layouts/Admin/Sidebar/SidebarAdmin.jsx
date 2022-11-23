import logo from '~/assets/images/logo250x250.png';

import { Link } from 'react-router-dom';
import config from '~/config';

import {
    faBed,
    faBellConcierge,
    faBuilding,
    faChartSimple,
    faClockRotateLeft,
    faHandshake,
    faHouse,
    faListCheck,
    faPeopleGroup,
    faPerson,
    faReceipt,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar } from 'flowbite-react/lib/esm/components';

function SidebarAdmin() {
    return (
        <div>
            <div className="flex justify-center items-center">
                <img src={logo} alt="logo" width={200} height={200} />
            </div>

            <aside className="mt-5">
                <Sidebar>
                    <Sidebar.Items>
                        <Link to={config.routes.homeAdmin} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faHouse} className="w-6" />
                            <span className="mx-2">Sơ đồ khách sạn</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faBuilding} className="w-6" />
                            <span className="mx-2">Quản lý tầng</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faBed} className="w-6" />
                            <span className="mx-2">Quản lý phòng</span>
                        </Link>
                        <Link
                            to={config.routes.personnelManage}
                            className="block mb-2 hover:bg-gray-200 p-1 rounded-md"
                        >
                            <FontAwesomeIcon icon={faPeopleGroup} className="w-6" />
                            <span className="mx-2">Quản lý nhân viên</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faPerson} className="w-6" />
                            <span className="mx-2">Quảnlý khách hàng</span>
                        </Link>
                        <Link to={config.routes.serviceManage} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faBellConcierge} className="w-6" />
                            <span className="mx-2">Quản lý dịch vụ</span>
                        </Link>
                        <Link to={config.routes.handOver} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faHandshake} className="w-6" />
                            <span className="mx-2">Giao ca</span>
                        </Link>
                        <Link to={config.routes.handOverManage} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faListCheck} className="w-6" />
                            <span className="mx-2">Lịch sử giao ca</span>
                        </Link>
                        <Link to={config.routes.historyAdmin} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faClockRotateLeft} className="w-6" />
                            <span className="mx-2">Lịch sử</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faReceipt} className="w-6" />
                            <span className="mx-2">Hóa đơn</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faChartSimple} className="w-6" />
                            <span className="mx-2">Thống kê</span>
                        </Link>
                        <Link to={config.routes.home} className="block mb-2 hover:bg-gray-200 p-1 rounded-md">
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-6" />
                            <span className="mx-2">Đăng xuất</span>
                        </Link>
                    </Sidebar.Items>
                </Sidebar>
            </aside>
        </div>
    );
}

export default SidebarAdmin;
