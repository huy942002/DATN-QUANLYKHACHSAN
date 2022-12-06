import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import HistoryAdmin from '~/pages/Admin/HistoryAdmin';
import PersonnelManage from '~/pages/Admin/PersonnelManage';
import ServiceManage from '~/pages/Admin/ServiceManage';
import HandOver from '~/pages/Admin/HandOver';
import RentalTypes from '~/pages/Admin/RentalTypeManage';
import CustomerManage from '~/pages/Admin/CustomerManage';
import HandOverManage from '~/pages/Admin/HandOverManage';
import Nationality from '~/pages/Admin/NationalityManage';
import KindOfRoomManage from '~/pages/Admin/KindOfRoomManage';
import Signup from '~/pages/Signup';
import Notfound from '~/pages/Notfound';
import SearchRoom from '~/pages/Customer/SearchRoom';
import RoomDetail from '~/pages/Customer/RoomDetail';
import RoomManage from '~/pages/Admin/RoomManage';
import Authorization from '~/pages/Admin/Authorization';
import CreateRoomManage from '~/pages/Admin/CreateRoomManage';
import CreateOptionRoomManage from '~/pages/Admin/CreateOptionRoomManage';
import RoomPlan from '~/pages/Admin/RoomRentalManage/RoomPlan/room-plan';
import RentalManage from '~/pages/Admin/RoomRentalManage/RentalManage/rental-manage';
import Booking from '~/pages/Customer/Booking';

// Routes public

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.room, component: RoomDetail, layout: null },
    { path: config.routes.searchRoom, component: SearchRoom, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.notfound, component: Notfound, layout: null },
    { path: config.routes.booking, component: Booking, layout: null },
];

const privateRoutes = [
    { path: config.routes.loginAdmin, component: LoginAdmin, layout: null },
    { path: config.routes.roomPlan, component: RoomPlan },
    { path: config.routes.rentalManage, component: RentalManage },
    { path: config.routes.historyAdmin, component: HistoryAdmin },
    { path: config.routes.personnelManage, component: PersonnelManage },
    { path: config.routes.serviceManage, component: ServiceManage },
    { path: config.routes.handOver, component: HandOver },
    { path: config.routes.customerManage, component: CustomerManage },
    { path: config.routes.roomManage, component: RoomManage },
    { path: config.routes.createRoomManage, component: CreateRoomManage },
    { path: config.routes.createOptionRoomManage, component: CreateOptionRoomManage },
    { path: config.routes.handOverManage, component: HandOverManage },
    { path: config.routes.kindOfRoom, component: KindOfRoomManage },
    { path: config.routes.nationality, component: Nationality },
    { path: config.routes.rentalTypeManage, component: RentalTypes },
    { path: config.routes.authorization, component: Authorization },
];

export { publicRoutes, privateRoutes };
