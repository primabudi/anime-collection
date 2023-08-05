import { useParams } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import {
  GET_MULTIPLE_ANIME_DETAILS,
  MultipleAnimeListQuery,
} from "../../graphql/getMultipleAnimeDetail";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";

interface RouteParams {
  collectionName: string;
}
const CollectionDetail = () => {
  const { collectionName }: RouteParams = useParams();
  const { animeCollection } = useAnimeCollectionContext();
  const collection = animeCollection.find((col) => col.name === collectionName);
  console.log(collection?.animeIds);

  const {
    loading,
    error,
    data: collectionDetail,
  } = useQuery<MultipleAnimeListQuery>(GET_MULTIPLE_ANIME_DETAILS, {
    variables: { ids: collection?.animeIds },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (collection && collectionDetail) {
    const { Page } = collectionDetail;
    const { media } = Page;
    return (
      <S.Wrapper>
        <h2>{collection.name}</h2>
        {media.map((anime) => {
          const { coverImage, description, genres, title } = anime;
          return (
            <>
              <img src={coverImage.medium} alt={title.english || ""} />
              <div>{description}</div>
              <h5>Genre : {genres.join(", ")}</h5>
            </>
          );
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default CollectionDetail;