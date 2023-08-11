import { useEffect, useState } from "react";
import "./Group.scss";
import PhotoComp from "../PhotoComp/PhotoComp";
import GroupForm from "./components/GroupForm/GroupForm";
import GroupDto from "../Dtos/GroupDto";
import { Member } from "../Dtos/Member";
import CartForm from "../CartForm/CartForm";
import { Link, useParams } from "react-router-dom";
import ShareForm from "../ShareForm/ShareForm";
import PhotoForm from "../PhotoForm/PhotoForm";
import { Photo } from "../Dtos/Photo";

interface titleProps {
  title: string;
  isEmpty: boolean;
}

function Title({ title, isEmpty }: titleProps) {
  if (!isEmpty) {
    return <h1>{title}</h1>;
  }
  return null;
}

/*
active forms

0 - no active form
1 - cart form
2 - share form
*/

function Group() {
  const [activeTab, setActiveTab] = useState(0);
  const [group, setGroup] = useState<GroupDto | undefined>(undefined);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalImage, setModalImage] = useState(-1);
  const [joined, setJoined] = useState(false);
  const [form, setForm] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>("undefined");

  const openCart = (src: string) => {
    setForm(1);
    setImgSrc(src);
  };

  const openShare = (src: string) => {
    setForm(2);
    setImgSrc(src);
  };

  let { groupId } = useParams();
  useEffect(() => {
    const requestOptions: RequestInit = localStorage.getItem("token")
      ? {
          method: "POST",
          body: JSON.stringify({
            id: groupId,
            token: localStorage.getItem("token"),
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      : {
          method: "POST",
          body: JSON.stringify({
            id: groupId,
            token: null,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
    fetch("/api/groups/getGroup", requestOptions)
      .then((groupData) => groupData.json())
      .then((groupData) => {
        let groupD: GroupDto = {
          ...groupData,
        };
        setGroup(groupD);
        setJoined(groupData.joined);
        setPhotos(groupD.photos);
      });
  }, []);
  const changeTab = (tab: number) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };
  const changeModalImage = (inc: number) => {
    setModalImage(modalImage + inc);
  };
  return (
    <div className="Group">
      <div className={`modal ${modalImage !== -1 ? "active" : ""}`}>
        <svg
          className="close"
          onClick={() => setModalImage(-1)}
          width="32"
          height="31"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#f1f1f1" fillRule="evenodd">
            <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
            <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
          </g>
        </svg>

        <div className="main-img">
          <img
            className={`cursor ${modalImage !== 0 ? "active" : ""}`}
            src="/images/icon-previous.svg"
            alt=""
            onClick={() => changeModalImage(-1)}
          />
          <img
            className="modal-content"
            src={`/api/uploads/${photos.at(modalImage)?.src}`}
            alt=""
          />
          <img
            className={`cursor ${
              photos?.length != undefined && modalImage !== photos?.length - 1
                ? "active"
                : ""
            }`}
            src="/images/icon-next.svg"
            onClick={() => changeModalImage(1)}
            alt=""
          />
        </div>
      </div>

      <CartForm
        cart={form === 1}
        cartSrc={imgSrc}
        closeCart={() => setForm(0)}
      />

      <ShareForm
        isOpen={form === 2}
        shareSrc={imgSrc}
        closeShare={() => setForm(0)}
      />

      <div className="group-header">
        <img
          src={`/api/uploads/${group?.imgSrc || "undefined"}`}
          alt="Group Profile"
        />

        <div className="groupName">
          <h1>{group?.name}</h1>
          <div className="buttons">
            <button
              className={joined ? "clicked" : ""}
              onClick={() => setJoined((j) => !j)}
            >
              {joined ? "Joined" : "Join"}
            </button>

            <PhotoForm
              group={groupId}
              update={(photo: Photo) => {
                setPhotos((p) => [...p, photo]);
              }}
            />
          </div>
        </div>
        <ul>
          <li>
            <h3>
              <em>{photos.length}</em>{" "}
              {photos.length === 1 ? "photo" : "photos"}
            </h3>
          </li>
          <li>
            <h3>
              <em>{group?.members.length}</em>{" "}
              {group?.members.length === 1 ? "member" : "members"}
            </h3>
          </li>
          <li>
            <h3>
              <em>{group?.subgroups.length}</em>{" "}
              {group?.subgroups.length === 1 ? "subgroup" : "subgroups"}
            </h3>
          </li>
        </ul>
      </div>

      <div className="group-content">
        <ul className="tabs">
          <li onClick={() => changeTab(0)}>
            <h3 className={`${activeTab == 0 ? "active" : ""}`}>Photos</h3>
          </li>
          <li onClick={() => changeTab(1)}>
            <h3 className={`${activeTab == 1 ? "active" : ""}`}>Members</h3>
          </li>
          <li onClick={() => changeTab(2)}>
            <h3 className={`${activeTab == 2 ? "active" : ""}`}>Subgroups</h3>
          </li>
        </ul>

        <div className="tab-content">
          <div className={`images ${activeTab == 0 ? "active" : ""}`}>
            {photos.length !== 0 ? (
              photos.map((photo, index) => (
                <PhotoComp
                  key={photo.id}
                  id={`photo-${photo.id}`}
                  src={photo.src}
                  imageFunction={() => setModalImage(index)}
                  openCart={() => openCart(photo.src)}
                  openShare={() => openShare(photo.src)}
                  liked={false}
                />
              ))
            ) : (
              <span>There are currently no photos in this group.</span>
            )}
          </div>

          <div className={`members ${activeTab == 1 ? "active" : ""}`}>
            {group?.members.map((member) => (
              <Link
                key={member.id}
                to={`/user/${decodeURIComponent(member.id).replace(
                  ".",
                  "%2E"
                )}`}
              >
                <div id={`member-${member.id}`} className="member">
                  <img
                    src={`/api/uploads/${member.imgSrc || "undefined"}`}
                    alt=""
                  />
                  <span>{member.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className={`subgroups ${activeTab == 2 ? "active" : ""}`}>
            <Title
              title="This group doesn't have any relatives."
              isEmpty={
                group?.parent !== undefined && group?.subgroups.length !== 0
              }
            ></Title>
            <Title
              title="Parent Group"
              isEmpty={group?.parent === null}
            ></Title>
            {group?.parent !== null ? (
              <div className="parent">
                <div id={`parent-${group?.parent.id}`} className="subgroup">
                  <img src={group?.parent?.imgSrc} alt="" />
                  <span>{group?.parent.name}</span>
                </div>
              </div>
            ) : null}
            <div>
              <Title
                title="Children Groups"
                isEmpty={group?.subgroups.length === 0}
              ></Title>

              <GroupForm subgroups={group?.subgroups as Member[]} />
            </div>

            <div className="children">
              {group?.subgroups.map((subgroup, index) => (
                <Link to={`/group/${subgroup.id}`}>
                  <div
                    id={`subgroup-${subgroup.id}`}
                    className="subgroup"
                    data-index={index}
                  >
                    <img
                      src={`/api/uploads/${subgroup.imgSrc || "undefined"}`}
                      alt=""
                    />
                    <span>{subgroup.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
