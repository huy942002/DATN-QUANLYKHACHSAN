import { Link } from 'react-router-dom';
import config from '~/config';

import { Dropdown, Avatar } from 'flowbite-react';

import { faBell, faMoon, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
    return (
        <div>
            <div className="grid grid-cols-4 p-2 bg-slate-800">
                <div className="col-start-2">
                    <FontAwesomeIcon icon={faPhone} />
                    <span className="px-2">Hotline : 1900 000 000</span>
                </div>
                <div className="col-start-3 flex justify-center items-center text-xl">
                    <FontAwesomeIcon icon={faBell} />
                    <FontAwesomeIcon icon={faMoon} className="mx-5" />
                </div>
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
