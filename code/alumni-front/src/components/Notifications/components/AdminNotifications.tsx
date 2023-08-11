import { useEffect, useState } from "react";
import UserNotification from "../../Dtos/Notification";
import RequestDetails from "./RequestDetails/RequestDetails";
import NotificationC from "./NotificationC/NotificationC";

function AdminNotifications() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [requestIsOpen, setRequestIsOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<
    UserNotification | undefined
  >(undefined);
  const sortByDate = (a: UserNotification, b: UserNotification) => {
    return new Date(b.sent).valueOf() - new Date(a.sent).valueOf();
  };
  useEffect(() => {
    fetch("notifications.json")
      .then((data) => data.json())
      .then((data) => {
        const sorted = data.notifications;
        sorted.sort(sortByDate);
        setNotifications(sorted);
      });
  }, []);
  const NotificationsCount = () => {
    const count = notifications.filter((notif) => !notif.read).length;
    return count > 0 ? (
      <span className="notif-count">
        {notifications.filter((notif) => !notif.read).length || ""}
      </span>
    ) : (
      <></>
    );
  };

  const markNotificationsAsRead = () => {
    const modified = notifications.map((notif) => {
      return { ...notif, read: true } as UserNotification;
    });
    modified.sort(sortByDate);
    setNotifications(modified);
  };

  return (
    <>
      <div
        className={`contents ${requestIsOpen && activeRequest ? "" : "hidden"}`}
      >
        <RequestDetails
          request={activeRequest}
          processRequest={(decision) => {
            let newActive = { ...activeRequest!, status: decision };
            setActiveRequest(newActive);
            setNotifications(
              notifications.map((notif) =>
                notif.id === newActive.id ? { ...newActive } : { ...notif }
              )
            );
            setRequestIsOpen(false);
          }}
          exitRequest={() => setRequestIsOpen(false)}
        />
      </div>

      <div className={`contents ${requestIsOpen ? "hidden" : ""}`}>
        <div className="notifications open">
          <div className="notifications-header-container">
            <div className="notifications-header">
              <h1>Notifications</h1>
              <NotificationsCount />
            </div>
            <button onClick={() => markNotificationsAsRead()}>
              Mark all as Read
            </button>
          </div>
          <div className="notifications-content">
            {notifications
              .filter((notif) => !notif.read)
              .map((not) => (
                <NotificationC
                  key={not.id}
                  {...not}
                  setActive={() => {
                    let newNot = { ...not, read: true };
                    setNotifications(
                      notifications.map((n) => {
                        if (n.id != not.id) {
                          return n;
                        }
                        return newNot;
                      })
                    );
                    setRequestIsOpen(true);
                    setActiveRequest({ ...newNot });
                  }}
                />
              ))}

            {notifications
              .filter((notif) => notif.read)
              .map((not) => (
                <NotificationC
                  key={not.id}
                  {...not}
                  setActive={() => {
                    setRequestIsOpen(true);
                    setActiveRequest({ ...not });
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;
