import { UserRequest } from "../../../Dtos/Request";
import calcPosted from "../../../Dtos/calcPosted";
import ItemImage from "../ItemImage/ItemImage";

interface RequestProps extends UserRequest {
  setActive: () => void;
}

const RequestC = (props: RequestProps) => {
  return (
    <div onClick={() => props.setActive()}>
      <div className="notif-content">
        <span>{calcPosted(props.sent)}</span>
      </div>

      <ItemImage {...props.item} />
    </div>
  );
};

export default RequestC;
