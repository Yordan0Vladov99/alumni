import Message from "./Message";

export default interface ShareNotification extends Message {
  sender: string;
  email: string;
  senderImg: string;
  read: boolean;
  item: string;
}
