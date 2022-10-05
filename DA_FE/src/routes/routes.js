import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import HomeAdmin from '~/pages/Admin/HomeAdmin';
import Signup from '~/pages/Signup';
import Notfound from '~/pages/Notfound';

// Routes public

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.loginAdmin, component: LoginAdmin },
    { path: config.routes.homeAdmin, component: HomeAdmin },
    { path: config.routes.signup, component: Signup },
    { path: config.routes.notfound, component: Notfound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
