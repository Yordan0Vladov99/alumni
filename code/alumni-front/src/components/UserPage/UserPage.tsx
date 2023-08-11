import { useEffect, useState } from "react";
import "../Group/Group.scss";
import CartForm from "../CartForm/CartForm";
import PhotoComp from "../PhotoComp/PhotoComp";
import User from "../Dtos/User";
import { Link, useParams } from "react-router-dom";
import ShareForm from "../ShareForm/ShareForm";

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

function UserPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [modalImage, setModalImage] = useState(-1);
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

  let { userId } = useParams();

  useEffect(() => {
    const decodedUserId = decodeURIComponent(userId!);
    const requestOptions: RequestInit = localStorage.getItem("token")
      ? {
          method: "POST",
          body: JSON.stringify({
            email: decodedUserId,
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
            email: decodedUserId,
            token: null,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
    fetch("/api/users/getUser", requestOptions)
      .then((groupData) => groupData.json())
      .then((groupData: User) => {
        setUser({ ...groupData });
      });
  }, []);
  const changeTab = (tab: number) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };
  const changeModalImage = (inc: number) => {
    setModalImage((m) => m + inc);
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
            src={`/api/uploads/${user?.photos?.at(modalImage)?.src}`}
            alt=""
          />
          <img
            className={`cursor ${
              user?.photos?.length != undefined &&
              modalImage !== user?.photos?.length - 1
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
          src={`/api/uploads/${user?.profile || "undefined"}`}
          alt="user Profile"
        />
        <div className="groupName">
          <h1>{user?.name}</h1>
        </div>
        <ul>
          <li>
            <h3>
              <em>{user?.photos.length}</em>{" "}
              {user?.photos.length === 1 ? "photo" : "photos"}
            </h3>
          </li>
          <li>
            <h3>
              <em>{user?.groups.length}</em>{" "}
              {user?.groups.length === 1 ? "user" : "groups"}
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
            <h3 className={`${activeTab == 1 ? "active" : ""}`}>Groups</h3>
          </li>
        </ul>

        <div className="tab-content">
          <div className={`images ${activeTab == 0 ? "active" : ""}`}>
            {user?.photos.length !== 0 ? (
              user?.photos.map((photo, index) => (
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
              <span>There are currently no photos for this user.</span>
            )}
          </div>

          <div className={`subgroups ${activeTab == 1 ? "active" : ""}`}>
            <Title
              title="This user doesn't have any relatives."
              isEmpty={user?.groups.length !== 0}
            ></Title>
            <div>
              <Title title="Groups" isEmpty={user?.groups.length === 0}></Title>
            </div>

            <div className="chilren">
              {user?.groups.map((subgroup, index) => (
                <Link to={`/group/${subgroup.id}`}>
                  <div
                    key={subgroup.id}
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

export default UserPage;
