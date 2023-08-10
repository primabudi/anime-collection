import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import { AnimeListQuery, GET_ANIME_LIST } from "../../graphql/getAnimeList";
import { Button, CircularProgress } from "@mui/material";

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const {
    loading,
    error,
    data: animeList,
  } = useQuery<AnimeListQuery>(GET_ANIME_LIST, { variables: { id: page } });
  const history = useHistory();

  if (loading)
    return (
      <S.LoadingWrapper>
        <CircularProgress />
      </S.LoadingWrapper>
    );
  if (error) return <p>Error :(</p>;

  function onClickAnime(id: number) {
    history.push(`/anime/${id}`);
  }

  if (animeList) {
    return (
      <S.Wrapper>
        <S.ContainerGrid container spacing={1}>
          {animeList.Page.media.map((anime) => {
            return (
              <S.SubGrid key={anime.id} xs={6} sm={4} md={3}>
                <S.StyledCard
                  variant="outlined"
                  onClick={() => onClickAnime(anime.id)}
                >
                  <img
                    src={anime.coverImage.medium}
                    alt={anime.title.english || ""}
                  />
                  <div key={anime.id}>{anime.title.english}</div>
                </S.StyledCard>
              </S.SubGrid>
            );
          })}
        </S.ContainerGrid>

        <S.ButtonsWrapper>
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)} variant="contained">
              Page {page - 1}
            </Button>
          )}
          <Button onClick={() => setPage(page + 1)} variant="contained">
            Page {page + 1}
          </Button>
        </S.ButtonsWrapper>
      </S.Wrapper>
    );
  }
  return <>Empty Data</>;
};

export default AnimeList;
