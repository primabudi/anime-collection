import { Link, useParams } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import {
  AnimeDetailQuery,
  GET_ANIME_DETAIL,
} from "../../graphql/getAnimeDetail";
import { Button } from "@mui/material";
import React, { useState } from "react";
import AddNewCollectionModal from "../../components/AddNewCollectionModal";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";

interface RouteParams {
  detail: string;
}
const AnimeDetail = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { animeCollection } = useAnimeCollectionContext();
  const { detail }: RouteParams = useParams();

  const {
    loading,
    error,
    data: animeDetail,
  } = useQuery<AnimeDetailQuery>(GET_ANIME_DETAIL, {
    variables: { id: detail },
  });
  const animeExistIn = animeCollection.filter((col) =>
    col.animeIds.includes(animeDetail?.Media.id || -1),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (animeDetail) {
    const { Media } = animeDetail;
    const { title, description, genres, coverImage, episodes, averageScore } =
      Media;
    return (
      <>
        <S.Wrapper>
          <h2>{title.english}</h2>
          {animeExistIn.length > 0 && (
            <div className="existing-in">
              Added in these collections:{" "}
              {animeExistIn.map((col) => {
                return (
                  <React.Fragment key={col.name}>
                    <Link to={`/collection-detail/${col.name}`}>
                      {col.name}
                    </Link>{" "}
                  </React.Fragment>
                );
              })}
            </div>
          )}
          <Button
            className="add-collection"
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add to my collection
          </Button>
          <img src={coverImage.medium} alt={title.english || ""} />
          <div className="description">{description}</div>
          <h5>Episodes: {episodes}</h5>
          <h5>Rating: {averageScore}</h5>
          <h5>Genre : {genres.join(", ")}</h5>
        </S.Wrapper>
        {openDialog && (
          <AddNewCollectionModal
            anime={Media}
            onClose={() => setOpenDialog(false)}
          />
        )}
      </>
    );
  }
  return <>Empty Data</>;
};

export default AnimeDetail;
