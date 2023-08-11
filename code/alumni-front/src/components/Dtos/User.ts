import { Member } from "./Member";
import { Photo } from "./Photo";

export default interface User {
  name: string;
  email: string;
  profile: string;
  photos: Photo[];
  groups: Member[];
}
