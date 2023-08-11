import UserNotification from "../../../Dtos/Notification";
import { UserRequest } from "../../../Dtos/Request";
import ItemImage from "../ItemImage/ItemImage";
import "./RequestDetails.scss";

interface RequestProps {
  request: UserNotification | UserRequest | undefined;
  processRequest: (decision: string) => void;
  exitRequest: () => void;
}

const RequestDetails = (props: RequestProps) => {
  return props.request ? (
    <div className="request-details">
      <img
        onClick={() => props.exitRequest()}
        src="/images/previous-svgrepo-com.svg"
        alt="close"
      />
      <div className="details-content">
        <ItemImage {...props.request.item} />
        <div className="request-description">
          <h1>{props.request.item.type}</h1>
          <div className="sender-info">
            {"senderImg" in props.request ? (
              <img src={props.request.senderImg} alt="" />
            ) : (
              <></>
            )}
            {"sender" in props.request ? (
              <h2>{props.request.sender}</h2>
            ) : (
              <></>
            )}

            <span>{new Date(props.request.sent).toUTCString()}</span>
          </div>

          <h2>
            Price {props.request.item.price.toFixed(2)} &euro;; Quantity:{" "}
            {props.request.item.qty}
          </h2>
          <h1>
            Total{" "}
            {(props.request.item.price * props.request.item.qty).toFixed(2)}{" "}
            &euro;
          </h1>

          <span>Status: {props.request.status}</span>

          {props.request.status === "pending" && "sender" in props.request ? (
            <div className="buttons">
              <button
                className="accept"
                onClick={() => props.processRequest("accepted")}
              >
                <img src="/images/tick.svg" alt="tick" />
              </button>
              <button
                className="reject"
                onClick={() => props.processRequest("rejected")}
              >
                <img src="/images/icon-menu-close-light.svg" alt="cross" />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RequestDetails;
