import CartItem from "./CartItem";
import Message from "./Message";

export interface UserRequest extends Message {
  status: string;
  item: CartItem;
}
