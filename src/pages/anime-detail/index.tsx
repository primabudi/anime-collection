import { useParams } from "react-router-dom";
import * as S from "./styled";
import { useQuery } from "@apollo/client";
import {
  AnimeDetailQuery,
  GET_ANIME_DETAIL,
} from "../../graphql/getAnimeDetail";
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";

interface RouteParams {
  detail: string;
}
const AnimeDetail = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("-");
  const [newCollectionName, setNewCollectionName] = useState("");
  const { animeCollection, addAnime, createNewCollection } =
    useAnimeCollectionContext();
  const { detail }: RouteParams = useParams();

  const {
    loading,
    error,
    data: animeDetail,
  } = useQuery<AnimeDetailQuery>(GET_ANIME_DETAIL, {
    variables: { id: detail },
  });

  function onSubmitAddCollection(animeId: number) {
    if (selectedCollection === "-") {
      createNewCollection(newCollectionName, [animeId]);
    } else {
      addAnime(selectedCollection, [animeId]);
    }

    setOpenToast(true);
    setOpenDialog(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (animeDetail) {
    const { Media } = animeDetail;
    const {
      id,
      title,
      description,
      genres,
      coverImage,
      episodes,
      averageScore,
    } = Media;
    return (
      <>
        <S.Wrapper>
          <h2>{title.english}</h2>
          <Button onClick={() => setOpenDialog(true)}>
            Add to my collection
          </Button>
          <img src={coverImage.medium} alt={title.english || ""} />
          <div>{description}</div>
          <h5>Episodes: {episodes}</h5>
          <h5>Rating: {averageScore}</h5>
          <h5>Genre : {genres.join(", ")}</h5>
        </S.Wrapper>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add to Collection</DialogTitle>
          <FormControl fullWidth>
            <InputLabel id="collection-label">Collection</InputLabel>
            <Select
              labelId="collection-label"
              value={selectedCollection}
              label="Collection"
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <MenuItem value="-">Create new collection</MenuItem>
              {animeCollection.map((collection) => {
                return (
                  <MenuItem key={collection.name} value={collection.name}>
                    {collection.name}
                  </MenuItem>
                );
              })}
            </Select>
            {selectedCollection === "-" && (
              <TextField
                id="outlined-basic"
                label="Collection Name"
                value={newCollectionName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewCollectionName(event.target.value);
                }}
                variant="outlined"
              />
            )}
            <Button onClick={() => onSubmitAddCollection(id)}>Submit</Button>
          </FormControl>
        </Dialog>
        <Snackbar
          open={openToast}
          autoHideDuration={1000}
          onClose={() => setOpenToast(false)}
        >
          <Alert
            onClose={() => setOpenToast(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {title.english} added to Collection.
          </Alert>
        </Snackbar>
      </>
    );
  }
  return <>Empty Data</>;
};

export default AnimeDetail;
