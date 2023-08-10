import styled from "@emotion/styled";
import { Card, Unstable_Grid2 } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Wrapper = styled.div`
  background-color: lightblue;
  max-width: 85vw;
  padding: 8px 16px;
  margin: 0 auto;
  border-radius: 16px;

  h2 {
    text-align: center;
  }
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
  position: relative;

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

const StyledCancelIcon = styled(CancelIcon)`
  position: absolute;
  top: 0;
  right: 0;
`;

export { Wrapper, ContainerGrid, SubGrid, StyledCard, StyledCancelIcon };
