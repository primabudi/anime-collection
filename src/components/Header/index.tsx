import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styled";

const Header = () => {
  const history = useHistory();
  function onClickHeader() {
    history.push("/");
  }

  function onClickMyCollection() {
    history.push("/collection-list");
  }

  return (
    <S.Wrapper>
      <S.Title onClick={() => onClickHeader()}>Anime Database</S.Title>
      <S.CollectionButton
        onClick={() => onClickMyCollection()}
        variant="contained"
      >
        My Collection
      </S.CollectionButton>
    </S.Wrapper>
  );
};

export default Header;
