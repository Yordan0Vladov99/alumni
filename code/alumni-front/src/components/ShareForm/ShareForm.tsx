import { useState } from "react";
import "./ShareForm.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList/SearchResultsList";
import { Member } from "../Dtos/Member";

interface shareProps {
  isOpen: boolean;
  shareSrc: string;
  closeShare: () => void;
}

const ShareForm = (props: shareProps) => {
  const [results, setResults] = useState<Member[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleUser = (user: string) => {
    if (selected.includes(user)) {
      setSelected((s) => s.filter((email) => email != user));
    } else {
      setSelected((s) => [...s, user]);
    }
  };

  const isSelected = (user: string) => selected.includes(user);
  const shareImage = () => {
    const shareRequest = {
      token: localStorage.getItem("token"),
      img: props.shareSrc,
      receivers: selected,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(shareRequest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch("/api/item/share", requestOptions).then(() => {
      setSelected([]);
      props.closeShare();
    });
  };

  return (
    <div className={`shareFormContainer ${props.isOpen ? "active" : ""}`}>
      <svg
        className="close"
        onClick={() => props.closeShare()}
        width="32"
        height="31"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <g fill="#f1f1f1" fillRule="evenodd">
          <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
          <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
        </g>
      </svg>
      <div className="shareForm">
        <div className="imgContainer">
          <img
            className="itemSrc"
            src={`/api/uploads/${props.shareSrc}`}
            alt=""
          />
        </div>
        <div className="formContent">
          <div className="submit">
            <span>{selected.length} Selected</span>
            <img
              className={selected.length > 0 ? "active" : ""}
              src="/images/paper-plane-top.svg"
              alt="pp-top"
              onClick={() => shareImage()}
            />
          </div>
          <SearchBar setResults={(data: Member[]) => setResults(data)} />
          {results && results.length > 0 && (
            <SearchResultsList
              results={results}
              toggleUser={toggleUser}
              isSelected={isSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareForm;
