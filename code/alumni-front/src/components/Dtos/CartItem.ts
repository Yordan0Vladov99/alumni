interface CartItem {
  type: "cup" | "tshirt" | "frame";
  color: "black" | "white" | undefined;
  src: string;
  qty: number;
  price: number;
}

export default CartItem;
