import UserNotification from "../../../Dtos/Notification";
import calcPosted from "../../../Dtos/calcPosted";
import ItemImage from "../ItemImage/ItemImage";

interface NotificationProps extends UserNotification {
  setActive: () => void;
}

const NotificationC = (props: NotificationProps) => {
  return (
    <div
      className={`notification ${!props.read ? "unread" : ""} `}
      onClick={() => props.setActive()}
    >
      <img src={props.senderImg} alt={props.senderImg} />

      <div className="notif-content">
        <p>
          <b>{props.sender}</b> has requested a {props.item.type}
        </p>
        <span>{calcPosted(props.sent)}</span>
      </div>

      <ItemImage {...props.item} />
    </div>
  );
};

export default NotificationC;
