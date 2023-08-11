import AdminNotifications from "./components/AdminNotifications";
import UserNotifications from "./components/UserNotifications";
import "./Notifications.scss";

function Notifications() {
  const generateNotifications = () => {
    switch (localStorage.getItem("type")) {
      case "ROLE_ADMIN":
        return <AdminNotifications />;
      case "ROLE_USER":
        return <UserNotifications />;
      default:
        return <h1>Invalid</h1>;
    }
  };
  return generateNotifications();
}

export default Notifications;
