import * as S from "./styled";
import { useQuery } from "@apollo/client";
import { AnimeListQuery, GET_ANIME_LIST } from "../../graphql/getAnimeList";
import { useHistory } from "react-router-dom";
const AnimeList = () => {
  const {
    loading,
    error,
    data: animeList,
  } = useQuery<AnimeListQuery>(GET_ANIME_LIST);
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function onClickAnime(id: number) {
    history.push(`/anime/${id}`);
  }

  if (animeList) {
    return (
      <S.Wrapper>
        {animeList.Page.media.map((anime) => {
          return (
            <h3 key={anime.id} onClick={() => onClickAnime(anime.id)}>
              {anime.title.english}
            </h3>
          );
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default AnimeList;
