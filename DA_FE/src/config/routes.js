const routes = {
    home: '/',
    loginAdmin: '/admin/login',
    historyAdmin: '/admin/history',
    roomAdmin: '/admin/room-check/:information',
    personnelManage: '/admin/personnel-manage',
    serviceManage: '/admin/service-manage',
    handOver: '/admin/hand-over',
    handOverManage: '/admin/hand-over-manage',
    customerManage: '/admin/customer-manage',
    nationality: '/admin/nationality',
    searchRoom: '/room/search',
    room: '/room/detail',
    roomManage: '/admin/room-manage',
    createRoomManage: '/admin/create-room',
    createOptionRoomManage: '/admin/create-option-room',
    rentalTypeManage: '/admin/rental-type-manage',
    authorization: '/admin/authorization',
    login: '/login',
    signup: '/signup',
    notfound: '/*',
    roomPlan: '/admin/room-plan',
    rentalManage: '/admin/rental-manage/:type/:idRoomChoose',
};
export default routes;
