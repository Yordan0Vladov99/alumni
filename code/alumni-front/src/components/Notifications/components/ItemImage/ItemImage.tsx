import CartItem from "../../../Dtos/CartItem";
import "./ItemImage.scss";
const ItemImage = (props: CartItem) => {
  switch (props.type) {
    case "tshirt":
      return (
        <div className="img-section t-shirt">
          <img
            src={`images/${props.color}-t-shirt-front.jpg`}
            className="mockup"
            alt={`${props.color} T-Shirt`}
          />

          <img className="itemSrc" src={props.src} alt="" />
        </div>
      );
    case "cup":
      return (
        <div className="img-section cup">
          <img src={`images/1060.jpg`} className="mockup" alt="cup" />

          <img className="itemSrc" src={props.src} alt="" />
        </div>
      );
    case "frame":
      return (
        <div className="img-section fr">
          <div className="frame">
            <img className="itemSrc" src={props.src} alt="" />
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};

export default ItemImage;
