import styled from "@emotion/styled";
import { Card, Unstable_Grid2 } from "@mui/material";

const Wrapper = styled.div`
  max-width: 1000px;
  padding: 0 16px;
  margin: 0 auto;
`;

const ContainerGrid = styled(Unstable_Grid2)`
  align-items: center;
  display: flex;
  width: 100%;
`;

const SubGrid = styled(Unstable_Grid2)`
  justify-content: center;
`;
const StyledCard = styled(Card)`
  width: 50%;
  height: 220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid rgba(0, 0, 0, 0.65);
  cursor: pointer;
  background-color: ghostwhite;

  img {
    width: 100px;
    height: 138px;
    margin: 0 auto;
    padding: 8px;
  }

  div {
    text-align: center;
    padding: 8px;
  }
`;

export { Wrapper, ContainerGrid, SubGrid, StyledCard };
