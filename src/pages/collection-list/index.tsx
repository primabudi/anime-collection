import * as S from "./styled";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
const CollectionList = () => {
  const { animeCollection } = useAnimeCollectionContext();

  if (animeCollection.length > 0) {
    return (
      <S.Wrapper>
        {animeCollection.map((collection) => {
          return (
            <>
              <h3 key={collection.name}>{collection.name}</h3>
              {collection.animeList.map((anime) => anime.title.english)}
            </>
          );
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default CollectionList;
