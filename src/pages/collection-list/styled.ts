import styled from "@emotion/styled";
import { Card, Unstable_Grid2 } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Wrapper = styled.div`
  background-color: lightblue;
  max-width: 85vw;
  padding: 16px;
  margin: 0 auto;
  border-radius: 16px;

  h2 {
    text-align: center;
  }

  .add-new-collection {
    margin: 0 auto 16px;
  }
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
  position: relative;
  width: 150px;
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
    padding: 8px 24px 8px 8px;
  }

  div {
    text-align: center;
    padding: 8px;
  }
`;

const StyledCancelIcon = styled(CancelIcon)`
  position: absolute;
  top: 0;
  right: 0;
`;

export { Wrapper, ContainerGrid, SubGrid, StyledCard, StyledCancelIcon };
