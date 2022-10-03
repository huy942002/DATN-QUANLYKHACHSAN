import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/LoginAdmin';
import Signup from '~/pages/Signup';
import Notfound from '~/pages/Notfound';

// Routes public

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.adminLogin, component: LoginAdmin },
    { path: config.routes.signup, component: Signup },
    { path: config.routes.notfound, component: Notfound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
