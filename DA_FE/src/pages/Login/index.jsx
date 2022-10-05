import config from '~/config';

import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={'wrapper'}>
            <h1>Login Page</h1>
            <Link to={config.routes.home}>Home</Link> |<Link to={config.routes.login}>Login</Link> |
            <Link to={config.routes.signup}>Signup</Link>
        </div>
    );
}

export default Login;
