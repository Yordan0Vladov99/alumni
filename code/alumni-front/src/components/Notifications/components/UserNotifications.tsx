import { useEffect, useState } from "react";
import RequestDetails from "./RequestDetails/RequestDetails";
import Message from "../../Dtos/Message";
import { UserRequest } from "../../Dtos/Request";
import RequestC from "./RequestC/RequestC";
import ShareNotification from "../../Dtos/ShareNotifications";
import NotificationU from "./NotificationU/NotificationU";

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState<ShareNotification[]>([]);
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [requestIsOpen, setRequestIsOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<UserRequest | undefined>(
    undefined
  );
  const [activeNotification, setActiveNotification] = useState<
    string | undefined
  >(undefined);
  const sortByDate = (a: Message, b: Message) => {
    return new Date(b.sent).valueOf() - new Date(a.sent).valueOf();
  };

  useEffect(() => {
    fetch("userNotifications.json")
      .then((data) => data.json())
      .then((data) => {
        const notifications = data.notifications;
        notifications.sort(sortByDate);
        setNotifications(notifications);

        const requests = data.requests;
        requests.sort(sortByDate);
        setRequests(requests);
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

  const changeTab = (tab: number) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  const markNotificationsAsRead = () => {
    const modified = notifications.map((notif) => {
      return { ...notif, read: true } as ShareNotification;
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
            setRequests(
              requests.map((req) =>
                req.id === newActive.id ? { ...newActive } : { ...req }
              )
            );
            setRequestIsOpen(false);
          }}
          exitRequest={() => setRequestIsOpen(false)}
        />
      </div>
      <div
        className={`sharedImage ${
          activeNotification !== undefined ? "open" : ""
        }`}
      >
        <svg
          className="close"
          onClick={() => setActiveNotification(undefined)}
          width="32"
          height="31"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#f1f1f1" fillRule="evenodd">
            <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
            <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
          </g>
        </svg>
        <img src={activeNotification} alt="" />
      </div>
      <div className={`contents ${requestIsOpen ? "hidden" : ""}`}>
        <ul className="tabs">
          <li onClick={() => changeTab(0)}>
            <h3 className={`${activeTab == 0 ? "active" : ""}`}>Requests</h3>
          </li>
          <li onClick={() => changeTab(1)}>
            <h3 className={`${activeTab == 1 ? "active" : ""}`}>
              Notifications
            </h3>
          </li>
        </ul>
        <div className={`notifications ${activeTab === 0 ? "open" : ""}`}>
          <div className="notifications-content">
            {requests.map((not) => (
              <RequestC
                key={not.id}
                {...not}
                setActive={() => {
                  let newNot = { ...not, read: true };
                  setRequests(
                    requests.map((n) => {
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
          </div>
        </div>

        <div className={`notifications ${activeTab === 1 ? "open" : ""}`}>
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
            {notifications.map((not) => (
              <NotificationU
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
                  setActiveNotification(not.item);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotifications;
