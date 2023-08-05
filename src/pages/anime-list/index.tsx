// @ts-nocheck

import * as S from "./styled";
import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../../graphql/getAnimeList";
const AnimeList = () => {
  const { loading, error, data: animeList } = useQuery(GET_ANIME_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (animeList) {
    console.log(animeList);
    return (
      <S.Wrapper>
        {animeList.Page.media.map((anime) => {
          return <div>{anime.title.english}</div>;
        })}
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default AnimeList;
