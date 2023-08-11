import IndexedCartItem from "../../../Dtos/IndexedCartItem";
import "./CItem.scss";
interface cartProps extends IndexedCartItem {
  close: () => void;
  changeTotal: (inc: number) => void;
}

const labels = {
  tshirt: "T-Shirt",
  cup: "Cup",
  frame: "Frame",
};
const CItem = (props: cartProps) => {
  const ImageSection = () => {
    switch (props.type) {
      case "tshirt":
        return (
          <div className="img-section t-shirt">
            <img
              src={`images/${props.color}-t-shirt-front.jpg`}
              className="mockup"
              alt={`${props.color} T-Shirt`}
            />

            <img className="itemSrc" src={`/api/uploads/${props.src}`} alt="" />
          </div>
        );
      case "cup":
        return (
          <div className="img-section cup">
            <img src={`images/1060.jpg`} className="mockup" alt="Cup" />

            <img className="itemSrc" src={`/api/uploads/${props.src}`} alt="" />
          </div>
        );
      case "frame":
        return (
          <div className="img-section fr">
            <div className="frame">
              <img
                className="itemSrc"
                src={`/api/uploads/${props.src}`}
                alt=""
              />
            </div>
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="CItem">
      <svg
        className="close"
        onClick={() => {
          props.close();
        }}
        width="32"
        height="31"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <g fill="#5d5f79" fillRule="evenodd">
          <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
          <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
        </g>
      </svg>
      <ImageSection />
      <div className="options-section">
        <h1>{labels[props.type]}</h1>
        <h1>Price</h1>
        <p>{(props.qty * props.price).toFixed(2)} &euro; </p>
        {props.color !== undefined ? <span>Color: {props.color}</span> : ""}
      </div>
      <div className="button-section">
        <div className="quantity">
          <img
            src="/images/icon-minus.svg"
            alt="minus"
            onClick={() => {
              if (props.qty > 1) {
                props.changeTotal(-1);
              }
            }}
          />
          <p>{props.qty}</p>
          <img
            src="/images/icon-plus.svg"
            alt="plus"
            onClick={() => props.changeTotal(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default CItem;
