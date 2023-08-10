import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
import { Anime } from "../../types/anime";

interface DeleteCollectionModalProps {
  onClose: () => void;
  collectionName: string;
  anime?: Anime;
  newThumbnail?: string;
}
const DeleteCollectionModal = ({
  onClose,
  collectionName,
  anime,
  newThumbnail,
}: DeleteCollectionModalProps) => {
  const { deleteCollection, deleteAnime } = useAnimeCollectionContext();
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    if (anime) {
      deleteAnime(collectionName, [anime.id], newThumbnail);
    } else {
      deleteCollection(collectionName);
    }

    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure to delete ${
          anime ? anime.title.english : collectionName
        }?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete} autoFocus variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCollectionModal;
