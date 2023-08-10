import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";

interface DeleteCollectionModalProps {
  onClose: () => void;
  collectionName: string;
}
const DeleteCollectionModal = ({
  onClose,
  collectionName,
}: DeleteCollectionModalProps) => {
  const { deleteCollection } = useAnimeCollectionContext();
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    deleteCollection(collectionName);
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
        {`Are you sure to delete ${collectionName}?`}
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
