import { Member } from "./Member";
import { Photo } from "./Photo";

export default interface GroupDto {
  name: string;
  imgSrc: string;
  parent: Member;
  photos: Photo[];
  subgroups: Member[];
  members: Member[];
}
