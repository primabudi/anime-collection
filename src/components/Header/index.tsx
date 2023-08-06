import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  function onClickHeader() {
    history.push("/");
  }

  function onClickMyCollection() {
    history.push("/collection-list");
  }

  return (
    <>
      <h1 onClick={() => onClickHeader()}>Anime Database</h1>
      <button onClick={() => onClickMyCollection()}>My Collection</button>
    </>
  );
};

export default Header;
