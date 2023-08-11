import { NavLink } from "react-router-dom";
import "./TaskBar.css";
import { useState } from "react";

function TaskBar() {
  const [active, setActive] = useState(false);
  return (
    <div className={`TaskBar ${active ? "active" : ""}`}>
      <button
        onClick={() => {
          setActive(true);
        }}
      >
        <img src="/images/icon-menu.svg" alt="menu" />
      </button>
      <img src="/images/alumni.svg" alt="alumni" />

      <ul className="paths">
        <button
          onClick={() => {
            setActive(false);
          }}
        >
          <img src="/images/icon-menu-close.svg" alt="menu-close" />
        </button>

        {localStorage.getItem("token") ? (
          <>
            {" "}
            <li className="path">
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className="path"
              onClick={() => {
                localStorage.removeItem("email");
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
                window.location.reload();
              }}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="path">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="path">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="path">
              <NavLink to="/registration">Register</NavLink>
            </li>
          </>
        )}
      </ul>

      {localStorage.getItem("token") ? (
        <div className="profile">
          <NavLink to="/notifications">
            <svg
              className="bell"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <title>Notifications</title>
              <path
                d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                fill="#00001A"
              />
            </svg>
          </NavLink>
          <NavLink to="/checkout">
            <svg
              className="cart"
              width="22"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Cart</title>
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill="#00001A"
                fillRule="nonzero"
              />
            </svg>
          </NavLink>
          <img
            src={`/api/uploads/${
              localStorage.getItem("profile") || "undefined"
            }`}
            alt="Your profile"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TaskBar;
