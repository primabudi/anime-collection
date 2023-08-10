import styled from "@emotion/styled";
import { Unstable_Grid2, Card } from "@mui/material";

const Wrapper = styled.div`
  max-width: 1000px;
  padding: 0 16px;
  margin: 0 auto;
`;

const ContainerGrid = styled(Unstable_Grid2)`
  background-color: lightblue;
  align-items: center;
  display: flex;
  width: 100%;
  padding: 16px 0;
  border-radius: 16px;
`;

const SubGrid = styled(Unstable_Grid2)`
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 150px;
  height: 220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid rgba(0, 0, 0, 0.65);
  cursor: pointer;
  background-color: ghostwhite;

  &:hover {
    background-color: lightgray;
  }

  img {
    width: 100px;
    height: 138px;
    margin: 0 auto;
    padding: 8px;
  }
  div {
    font-size: 14px;
    height: 62px;
    text-align: center;
    padding: 0 8px 8px 8px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  gap: 20px;
`;

const LoadingWrapper = styled.div`
  text-align: center;
`;

export {
  Wrapper,
  ContainerGrid,
  SubGrid,
  StyledCard,
  ButtonsWrapper,
  LoadingWrapper,
};
