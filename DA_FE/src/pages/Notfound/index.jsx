import config from '~/config';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={'wrapper'}>
            <h1>404 Not Found</h1>
            <Link to={config.routes.home}>Home</Link> |<Link to={config.routes.login}>Login</Link> |
            <Link to={config.routes.signup}>Signup</Link>
        </div>
    );
}

export default Home;
