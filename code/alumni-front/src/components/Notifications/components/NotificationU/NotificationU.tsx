import ShareNotification from "../../../Dtos/ShareNotifications";
import calcPosted from "../../../Dtos/calcPosted";

interface NotificationProps extends ShareNotification {
  setActive: () => void;
}
const NotificationU = (props: NotificationProps) => {
  return (
    <div
      className={`notification ${!props.read ? "unread" : ""} `}
      onClick={() => props.setActive()}
    >
      <img src={props.senderImg} alt={props.senderImg} />

      <div className="notif-content">
        <p>
          <b>{props.sender}</b> has shared a photo.
        </p>
        <span>{calcPosted(props.sent)}</span>
      </div>

      <img src={`${props.item}`} alt="" className="imageContent" />
    </div>
  );
};

export default NotificationU;
