import { useHistory, useParams } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import {
  GET_MULTIPLE_ANIME_DETAILS,
  MultipleAnimeListQuery,
} from "../../graphql/getMultipleAnimeDetail";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
import React, { useState } from "react";
import { Anime } from "../../types/anime";
import DeleteCollectionModal from "../../components/DeleteCollectionModal";

interface RouteParams {
  collectionName: string;
}
const CollectionDetail = () => {
  const { collectionName }: RouteParams = useParams();
  const history = useHistory();
  const { animeCollection } = useAnimeCollectionContext();
  const [animeToDelete, setAnimeToDelete] = useState<Anime | null>();
  const collection = animeCollection.find((col) => col.name === collectionName);

  const {
    loading,
    error,
    data: collectionDetail,
  } = useQuery<MultipleAnimeListQuery>(GET_MULTIPLE_ANIME_DETAILS, {
    variables: { ids: collection?.animeIds },
  });

  function onClickAnime(id: number) {
    history.push(`/anime/${id}`);
  }

  function onClickDeleteAnime(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    anime: Anime,
  ) {
    e.stopPropagation();
    setAnimeToDelete(anime);
  }

  function newThumbnail(animeToDelete: Anime) {
    if (!collection || !collectionDetail) return undefined;
    const isAnimeToDeleteFirstIndex =
      collection.animeIds[0] === animeToDelete.id;

    if (isAnimeToDeleteFirstIndex && collection.animeIds.length > 1) {
      const secondAnimeFromCollection = collectionDetail.Page.media.find(
        (anime) => anime.id === collection.animeIds[1],
      );

      if (!secondAnimeFromCollection) return undefined;
      return secondAnimeFromCollection.coverImage.medium;
    } else if (isAnimeToDeleteFirstIndex && collection.animeIds.length === 1) {
      const defaultThumbnail =
        "https://www.shutterstock.com/image-vector/no-preview-image-icon-260nw-1295324875.jpg";
      return defaultThumbnail;
    }
    return undefined;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (collection && collectionDetail) {
    const { Page } = collectionDetail;
    const { media } = Page;
    return (
      <>
        <S.Wrapper>
          <h2>Collection Detail: {collection.name}</h2>
          <S.ContainerGrid container spacing={1}>
            {media.map((anime) => {
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
                    <S.StyledCancelIcon
                      onClick={(e) => onClickDeleteAnime(e, anime)}
                    />
                  </S.StyledCard>
                </S.SubGrid>
              );
            })}
          </S.ContainerGrid>
        </S.Wrapper>
        {animeToDelete && (
          <DeleteCollectionModal
            onClose={() => setAnimeToDelete(null)}
            collectionName={collectionName}
            anime={animeToDelete}
            newThumbnail={newThumbnail(animeToDelete)}
          />
        )}
      </>
    );
  }
  return <>Empty Data</>;
};

export default CollectionDetail;
