import CartItem from "./CartItem";

interface UserNotification {
  id: number;
  sender: string;
  email: string;
  senderImg: string;
  sent: string;
  read: boolean;
  status: string;
  item: CartItem;
}

export default UserNotification;
