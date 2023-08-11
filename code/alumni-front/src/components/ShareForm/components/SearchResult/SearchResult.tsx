import { Member } from "../../../Dtos/Member";
import "./SearchResult.scss";

interface resultProps extends Member {
  isSelected: boolean;
  toggleUser: () => void;
}
export const SearchResult = (props: resultProps) => {
  return (
    <div className="search-result" onClick={() => props.toggleUser()}>
      <div className="imgContainer">
        <img src={`/api/uploads/${props.imgSrc}`} alt="" />
      </div>
      <div className="userInfo">
        <h1>{props.name}</h1>
        <h2>{props.id}</h2>
      </div>
      <img
        className={`tick ${props.isSelected ? "active" : ""}`}
        src="/images/tick-white.svg"
        alt=""
      />
    </div>
  );
};
