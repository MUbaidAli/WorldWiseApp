import { useEffect } from "react";
import { useAuth } from "../Context/LoginAuth";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
function AppLayout() {
  const { user, isAuthorized } = useAuth();

  // useEffect(() => {
  //   if (!isAuthorized) return <p>You Are Not Authorized</p>;
  // }, [isAuthorized]);

  return (
    <div className={styles.app}>
      {user && isAuthorized && <User />}
      <Sidebar />

      <Map />
    </div>
  );
}

export default AppLayout;
