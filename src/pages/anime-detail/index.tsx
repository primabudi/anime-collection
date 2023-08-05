import { useParams } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import {
  AnimeDetailQuery,
  GET_ANIME_DETAIL,
} from "../../graphql/getAnimeDetail";

interface RouteParams {
  detail: string;
}
const AnimeDetail = () => {
  const { detail }: RouteParams = useParams();

  const {
    loading,
    error,
    data: animeDetail,
  } = useQuery<AnimeDetailQuery>(GET_ANIME_DETAIL, {
    variables: { id: detail },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (animeDetail) {
    const { Media } = animeDetail;
    const { title, description, genres, coverImage } = Media;
    return (
      <S.Wrapper>
        <h2>{title.english}</h2>
        <img src={coverImage.medium} alt={title.english || ""} />
        <div>{description}</div>
        <h5>Genre : {genres.join(", ")}</h5>
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default AnimeDetail;
