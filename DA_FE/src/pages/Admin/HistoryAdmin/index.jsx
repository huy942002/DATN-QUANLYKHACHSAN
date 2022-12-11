import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHistory } from '~/app/reducers/history';

function HistoryAdmin() {
    const [valueSearch, setValueSearch] = useState('');
    const historiess = useSelector((state) => state.history.histories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHistory());
        // eslint-disable-next-line
    }, []);

    console.log(historiess[historiess.length - 1]);
    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tìm kiếm nhân viên</p>
                </div>
                <div className="col-start-2 col-end-6">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input
                            type="search"
                            onChange={(e) => setTimeout(() => setValueSearch(e.target.value), 1000)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tìm kiếm..."
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Tên nhân viên
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Thời gian vào
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Thời gian ra
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái giao ca
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái hoạt động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {historiess
                                .filter((x) => x.users.username.toLowerCase().includes(valueSearch))
                                .reverse()
                                .map((x) => (
                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                        <td className="py-4 px-6">{x.users.username}</td>
                                        <td className="py-4 px-6">{x.timeIn}</td>
                                        <td className="py-4 px-6">{x.timeOut}</td>
                                        <td className="py-4 px-6">
                                            {x.handOverStatus === 0 ? 'Đã giao ca' : 'Đang trong ca'}
                                        </td>
                                        <td className="py-4 px-6">
                                            {x.status === 0 ? 'Hoạt động' : 'Không hoạt động'}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HistoryAdmin;
