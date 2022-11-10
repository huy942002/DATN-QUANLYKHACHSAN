import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import HomeAdmin from '~/pages/Admin/HomeAdmin';
import HistoryAdmin from '~/pages/Admin/HistoryAdmin';
import RoomDetailAdmin from '~/pages/Admin/RoomDetailAdmin';
import personnelManage from '~/pages/Admin/PersonnelManage';
import serviceManage from '~/pages/Admin/ServiceManage';
import handOver from '~/pages/Admin/HandOver';
import handOverManage from '~/pages/Admin/HandOverManage';
import Signup from '~/pages/Signup';
import Notfound from '~/pages/Notfound';
import SearchRoom from '~/pages/Customer/SearchRoom';
import RoomDetail from '~/pages/Customer/RoomDetail';

// Routes public

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.loginAdmin, component: LoginAdmin, layout: null },
    { path: config.routes.homeAdmin, component: HomeAdmin },
    { path: config.routes.historyAdmin, component: HistoryAdmin },
    { path: config.routes.roomAdmin, component: RoomDetailAdmin },
    { path: config.routes.personnelManage, component: personnelManage },
    { path: config.routes.serviceManage, component: serviceManage },
    { path: config.routes.handOver, component: handOver },
    { path: config.routes.handOverManage, component: handOverManage },
    { path: config.routes.room, component: RoomDetail, layout: null },
    { path: config.routes.searchRoom, component: SearchRoom, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.notfound, component: Notfound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
