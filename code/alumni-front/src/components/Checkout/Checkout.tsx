import { useEffect, useState } from "react";
import "./Checkout.scss";
import CartItem from "../Dtos/CartItem";
import IndexedCartItem from "../Dtos/IndexedCartItem";
import CItem from "./components/CItem/CItem";
import PaymentForm from "../PaymentForm/PaymentForm";

function App() {
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);
  const [cart, setCart] = useState<IndexedCartItem[] | undefined>(
    JSON.parse(
      localStorage.getItem("cart") !== "undefined"
        ? localStorage.getItem("cart") || "[]"
        : "[]"
    ).map((item: CartItem, index: number) => {
      return {
        ...item,
        id: index,
      } as IndexedCartItem;
    })
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="checkoutSection">
      <div className={`paymentContainer ${paymentIsOpen ? "active" : ""}`}>
        <svg
          className="close"
          onClick={() => setPaymentIsOpen(false)}
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
        <PaymentForm
          total={cart?.reduce((ac, it) => ac + it.price * it.qty, 0).toFixed(2)}
          close={() => {
            setPaymentIsOpen(false);
          }}
          emptyCart={() => {
            localStorage.setItem("cart", "[]");
            setCart([]);
          }}
        />
      </div>
      {cart?.length === undefined || cart?.length > 0 ? (
        <>
          <div className="items-section">
            {cart?.map((item) => (
              <CItem
                key={item.id}
                id={item.id}
                src={item.src}
                qty={item.qty}
                price={item.price}
                type={item.type}
                color={item.color}
                close={() => {
                  setCart(cart.filter((it) => it.id !== item.id));
                }}
                changeTotal={(inc) => {
                  let newItem = item;
                  newItem.qty += inc;
                  setCart(
                    cart.map((it) => {
                      if (it.id == item.id) {
                        return newItem;
                      }
                      return it;
                    })
                  );
                }}
              />
            ))}
          </div>
          <div className="total-section">
            <h1>Order Summary</h1>
            <div className="total">
              <span>Order total: </span>
              <span>
                {cart?.reduce((ac, it) => ac + it.price * it.qty, 0).toFixed(2)}{" "}
                &euro;
              </span>
            </div>
            <button onClick={() => setPaymentIsOpen(true)}>Checkout</button>
          </div>
        </>
      ) : (
        <h1>Your cart appears to be empty :( </h1>
      )}
    </div>
  );
}

export default App;
