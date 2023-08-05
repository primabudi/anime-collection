import * as S from "./styled";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
import { useHistory } from "react-router-dom";
const CollectionList = () => {
  const history = useHistory();
  const { animeCollection } = useAnimeCollectionContext();

  function onClickCollection(collectionName: string) {
    history.push(`/collection-detail/${collectionName}`);
  }

  if (animeCollection.length > 0) {
    return (
      <S.Wrapper>
        {animeCollection.map((collection) => {
          return (
            <div onClick={() => onClickCollection(collection.name)}>
              <h3 key={collection.name}>{collection.name}</h3>
              {collection.animeIds.join(", ")}
            </div>
          );
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default CollectionList;
