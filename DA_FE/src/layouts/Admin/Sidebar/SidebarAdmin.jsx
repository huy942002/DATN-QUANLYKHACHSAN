import logo from '~/assets/images/logo250x250.png';

import { Link } from 'react-router-dom';
import config from '~/config';

import {
    faBed,
    faBellConcierge,
    faBuilding,
    faChartSimple,
    faClockRotateLeft,
    faHouse,
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
                        <Sidebar.ItemGroup>
                            <Sidebar.Item>
                                <Link to={config.routes.homeAdmin} className="block">
                                    <FontAwesomeIcon icon={faHouse} className="w-6" />
                                    <span className="mx-2">Sơ đồ khách sạn</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faBuilding} className="w-6" />
                                    <span className="mx-2">Quản lý tầng</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faBed} className="w-6" />
                                    <span className="mx-2">Quản lý phòng</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faPeopleGroup} className="w-6" />
                                    <span className="mx-2">Quản lý nhân viên</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faPerson} className="w-6" />
                                    <span className="mx-2">Quảnlý khách hàng</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faBellConcierge} className="w-6" />
                                    <span className="mx-2">Quản lý dịch vụ</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.historyAdmin} className="block">
                                    <FontAwesomeIcon icon={faClockRotateLeft} className="w-6" />
                                    <span className="mx-2">Lịch sử</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faReceipt} className="w-6" />
                                    <span className="mx-2">Hóa đơn</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faChartSimple} className="w-6" />
                                    <span className="mx-2">Thống kê</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link to={config.routes.home} className="block">
                                    <FontAwesomeIcon icon={faRightFromBracket} className="w-6" />
                                    <span className="mx-2">Đăng xuất</span>
                                </Link>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </aside>
        </div>
    );
}

export default SidebarAdmin;
