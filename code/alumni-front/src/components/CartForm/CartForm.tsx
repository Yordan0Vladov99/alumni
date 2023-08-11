import Select from "react-select";
import "./CartForm.scss";
import { useState } from "react";
import IndexedCartItem from "../Dtos/IndexedCartItem";

interface cartProps {
  cart: boolean;
  cartSrc: string;
  closeCart: () => void;
}

const options = [
  { value: "tshirt", label: "T-Shirt" },
  { value: "cup", label: "Cup" },
  { value: "frame", label: "Frame" },
];

const CartForm = (props: cartProps) => {
  const [itemType, setItemType] = useState(options[0].value);
  const [color, setColor] = useState("black");
  const [qty, setQty] = useState(1);

  const sendToCart = () => {
    let cartStr = localStorage.getItem("cart") || "empty";
    let newItem: IndexedCartItem = {
      id: 0,
      type: itemType as "tshirt" | "cup" | "frame",
      src: props.cartSrc,
      color: itemType == "tshirt" ? (color as "black" | "white") : undefined,
      price: getPrice(),
      qty: qty,
    };

    if (cartStr === "empty") {
      const cart: IndexedCartItem[] = [newItem];
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const cart: IndexedCartItem[] = JSON.parse(cartStr);
      newItem.id = cart.length;
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    props.closeCart();
  };
  const getPrice = () => {
    switch (itemType) {
      case "tshirt":
        return 7.5;
      case "cup":
        return 8;
      case "frame":
        return 6;
      default:
        return 1;
    }
  };
  const ImageSection = () => {
    switch (itemType) {
      case "tshirt":
        return (
          <div className="img-section t-shirt">
            <img
              src={`/images/${color}-t-shirt-front.jpg`}
              className="mockup"
              alt={`${color} T-Shirt`}
            />

            <img
              className="itemSrc"
              src={`/api/uploads/${props.cartSrc}`}
              alt=""
            />
          </div>
        );
      case "cup":
        return (
          <div className="img-section cup">
            <img
              src={`/images/1060.jpg`}
              className="mockup"
              alt={`${color} T-Shirt`}
            />

            <img
              className="itemSrc"
              src={`/api/uploads/${props.cartSrc}`}
              alt=""
            />
          </div>
        );
      case "frame":
        return (
          <div className="img-section fr">
            <div className="frame">
              <img
                className="itemSrc"
                src={`/api/uploads/${props.cartSrc}`}
                alt=""
              />
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <div className={`cartFormContainer ${props.cart ? "active" : ""} `}>
      <svg
        className="close"
        onClick={() => props.closeCart()}
        width="32"
        height="31"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <g fill="#f1f1f1" fillRule="evenodd">
          <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
          <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
        </g>
      </svg>
      <div
        className="cartForm"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ImageSection />
        <div className="options-section">
          <label htmlFor="cart">Select Type</label>
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(e) => setItemType(e?.value as string)}
          />

          <div className="color-section">
            <h1>Price</h1>
            <p>{(qty * getPrice()).toFixed(2)} &euro; </p>
            {itemType == "tshirt" ? (
              <>
                <h1>Color</h1>
                <div className="colors">
                  <div
                    onClick={() => setColor("black")}
                    className={`color black ${
                      color == "black" ? "active" : ""
                    }`}
                  ></div>
                  <div
                    onClick={() => setColor("white")}
                    className={`color white ${
                      color == "white" ? "active" : ""
                    }`}
                  ></div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="button-section">
            <div className="quantity">
              <img
                src="/images/icon-minus.svg"
                alt="minus"
                onClick={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}
              />
              <p>{qty}</p>
              <img
                src="/images/icon-plus.svg"
                alt="plus"
                onClick={() => setQty(qty + 1)}
              />
            </div>
            <button onClick={() => sendToCart()}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
