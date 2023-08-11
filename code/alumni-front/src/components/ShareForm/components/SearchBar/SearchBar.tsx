import { useState } from "react";

import "./SearchBar.scss";
import { Member } from "../../../Dtos/Member";

export const SearchBar = (props: { setResults: (data: Member[]) => void }) => {
  const [input, setInput] = useState("");
  const requestOptions = (name: string) => {
    return {
      method: "POST",
      body: name,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  };

  const fetchData = (value: string) => {
    fetch("/api/users/findUsers", requestOptions(value))
      .then((response) => response.json())
      .then((res: Member[]) => {
        props.setResults(res);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value.length >= 4) fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <img src="/images/search.svg" alt="search" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
