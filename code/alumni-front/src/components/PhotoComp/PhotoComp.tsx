import { useState } from "react";
import "./PhotoComp.scss";
import { useNavigate } from "react-router-dom";

interface PhotoProps {
  id: string;
  imageFunction: () => void;
  openCart: () => void;
  openShare: () => void;
  src: string;
  liked: boolean;
}
function PhotoComp(props: PhotoProps) {
  const [liked, setLiked] = useState(props.liked);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  const likePicture = () => {
    if (localStorage.getItem("token")) {
      setLiked((l) => !l);
    } else {
      goToLogin();
    }
  };

  const updatePicture = (e: any) => {
    setTimeout(() => {
      e.target.src = `/api/uploads/${props.src}`;
    }, 1000);
  };
  return (
    <div className="photoComp">
      <img
        id={`photo-${props.id}`}
        src={`/api/uploads/${props.src}`}
        alt=""
        onError={(e) => updatePicture(e)}
      />
      <div className="links" onClick={() => props.imageFunction()}>
        {/*Heart*/}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill={liked ? " #ff0066" : "#ffffff"}
          onClick={(e) => {
            e.stopPropagation();

            likePicture();
          }}
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>

        {/*Cart*/}
        <div className="cartButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 21"
            onClick={(e) => {
              e.stopPropagation();
              props.openCart();
            }}
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#ffffff"
              fillRule="nonzero"
            />
          </svg>
        </div>

        {/*Share*/}
        <div className="shareButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 480"
            onClick={(e) => {
              e.stopPropagation();
              props.openShare();
            }}
          >
            <path
              fill="#ffffff"
              fillRule="nonzero"
              d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PhotoComp;
