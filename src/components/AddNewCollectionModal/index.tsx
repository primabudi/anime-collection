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
import { Anime } from "../../types/anime";
import { useFormik } from "formik";
import * as yup from "yup";

interface AddNewCollectionModalProps {
  onClose: () => void;
  anime?: Anime;
}

interface AddNewCollectionField {
  name: string;
  new_collection: string;
}
const AddNewCollectionModal = ({
  onClose,
  anime,
}: AddNewCollectionModalProps) => {
  const [openToast, setOpenToast] = useState(false);
  const { animeCollection, addAnime, createNewCollection } =
    useAnimeCollectionContext();

  const validationSchema = yup.object({
    name: yup.string().required(),
    new_collection: yup.string().when("name", (name, schema) => {
      return name[0] === "-"
        ? schema
            .required("validasinya mana")
            .test("name already exist", "name already exist", (name) => {
              return !animeCollection.map((col) => col.name).includes(name);
            })
            .test(
              "no-special-characters",
              "Cannot contain special characters",
              function (value) {
                const specialCharsRegex =
                  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

                return !specialCharsRegex.test(value);
              },
            )
        : schema;
    }),
  });
  const formik = useFormik({
    initialValues: { name: "-", new_collection: "" },
    onSubmit: onSubmitAddCollection,
    validationSchema: validationSchema,
  });

  function onSubmitAddCollection(values: AddNewCollectionField) {
    const animeIds = anime?.id ? [anime.id] : [];
    const thumbnail = anime?.coverImage?.medium || "";
    const { name, new_collection } = values;

    if (name === "-") {
      createNewCollection(new_collection, animeIds, thumbnail);
    } else {
      addAnime(name, animeIds);
    }

    setOpenToast(true);
    onClose();
  }

  return (
    <>
      <Dialog open={true} onClose={() => onClose()}>
        <DialogTitle>Add to Collection</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="collection-label">Collection</InputLabel>
            <Select
              name="name"
              labelId="collection-label"
              value={formik.values.name}
              label="Collection"
              onChange={formik.handleChange}
            >
              <MenuItem value="-">Create new collection</MenuItem>
              {anime &&
                animeCollection.map((collection) => {
                  return (
                    <MenuItem
                      key={collection.name}
                      value={collection.name}
                      disabled={collection.animeIds.includes(anime?.id || -1)}
                    >
                      {collection.name}
                    </MenuItem>
                  );
                })}
            </Select>
            {formik.values.name === "-" && (
              <TextField
                id="outlined-basic"
                name="new_collection"
                label="Collection Name"
                value={formik.values.new_collection}
                onChange={formik.handleChange}
                variant="outlined"
                error={
                  formik.touched.new_collection &&
                  Boolean(formik.errors.new_collection)
                }
                helperText={
                  formik.touched.new_collection && formik.errors.new_collection
                }
              />
            )}
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
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
          {anime
            ? `${anime.coverImage.medium} added to Collection.`
            : `Successfully created new collection`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddNewCollectionModal;
