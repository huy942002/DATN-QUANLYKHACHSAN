import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>Home Page</h1>
      <Link to={config.routes.home}>
        Home
        <FontAwesomeIcon icon={faHouseUser} />
      </Link>{" "}
      |<Link to={config.routes.login}>Login</Link> |
      <Link to={config.routes.signup}>Signup</Link>
    </div>
  );
}

export default Home;
