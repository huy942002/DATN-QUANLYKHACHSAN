import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import HomeAdmin from '~/pages/Admin/HomeAdmin';
import HistoryAdmin from '~/pages/Admin/HistoryAdmin';
import RoomDetailAdmin from '~/pages/Admin/RoomDetailAdmin';
import PersonnelManage from '~/pages/Admin/PersonnelManage';
import ServiceManage from '~/pages/Admin/ServiceManage';
import HandOver from '~/pages/Admin/HandOver';
import NumberOfFloor from '~/pages/Admin/NumberOfFloorManage';
import Facilities from '~/pages/Admin/FacilityManage';
import RentalTypes from '~/pages/Admin/RentalTypeManage';
import CustomerManage from '~/pages/Admin/CustomerManage';
import HandOverManage from '~/pages/Admin/HandOverManage';
import Nationality from '~/pages/Admin/NationalityManage';
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
    { path: config.routes.personnelManage, component: PersonnelManage },
    { path: config.routes.serviceManage, component: ServiceManage },
    { path: config.routes.handOver, component: HandOver },
    { path: config.routes.customerManage, component: CustomerManage },
    { path: config.routes.handOverManage, component: HandOverManage },
    { path: config.routes.numberOfFloorManage, component: NumberOfFloor },
    { path: config.routes.nationality, component: Nationality },
    { path: config.routes.facilityManage, component: Facilities },
    { path: config.routes.rentalTypeManage, component: RentalTypes },
    { path: config.routes.room, component: RoomDetail, layout: null },
    { path: config.routes.searchRoom, component: SearchRoom, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.notfound, component: Notfound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
