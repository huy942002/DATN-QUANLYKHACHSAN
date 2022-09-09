import config from "~/config";

import { Link } from "react-router-dom";

import styles from "./Notfound.module.scss"

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <Link to={config.routes.home}>Home</Link> |
      <Link to={config.routes.login}>Login</Link> |
      <Link to={config.routes.signup}>Signup</Link>
    </div>
  );
}

export default Home;
