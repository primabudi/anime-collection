import * as S from "./styled";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
const CollectionList = () => {
  const history = useHistory();
  const { animeCollection } = useAnimeCollectionContext();
  const defaultThumbnail =
    "https://www.shutterstock.com/image-vector/no-preview-image-icon-260nw-1295324875.jpg";

  function onClickCollection(collectionName: string) {
    history.push(`/collection-detail/${collectionName}`);
  }

  if (animeCollection.length > 0) {
    return (
      <S.Wrapper>
        <h2>My Collection</h2>
        <Button variant="contained">Add New Collection</Button>
        <S.ContainerGrid container spacing={1}>
          {animeCollection.map((collection) => {
            return (
              <S.SubGrid key={collection.name} xs={6} sm={4} md={3}>
                <S.StyledCard
                  onClick={() => onClickCollection(collection.name)}
                  variant="outlined"
                >
                  <img
                    src={collection.thumbnail || defaultThumbnail}
                    alt={"collection thumbnail"}
                  />
                  <div>{collection.name}</div>
                </S.StyledCard>
              </S.SubGrid>
            );
          })}
        </S.ContainerGrid>
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default CollectionList;
