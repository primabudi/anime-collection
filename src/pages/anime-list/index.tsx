import * as S from "./styled";
import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../../graphql/getAnimeList";
import { AnimeListPage } from "../../types/anime";
const AnimeList = () => {
  const {
    loading,
    error,
    data: animeList,
  } = useQuery<AnimeListPage>(GET_ANIME_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (animeList) {
    return (
      <S.Wrapper>
        {animeList.Page.media.map((anime) => {
          return <div key={anime.id}>{anime.title.english}</div>;
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default AnimeList;
