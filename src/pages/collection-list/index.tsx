import * as S from "./styled";
import { useAnimeCollectionContext } from "../../context/AnimeCollectionProvider";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import React, { useState } from "react";
import AddNewCollectionModal from "../../components/AddNewCollectionModal";
import DeleteCollectionModal from "../../components/DeleteCollectionModal";
const CollectionList = () => {
  const history = useHistory();
  const { animeCollection } = useAnimeCollectionContext();
  const defaultThumbnail =
    "https://www.shutterstock.com/image-vector/no-preview-image-icon-260nw-1295324875.jpg";
  const [openAddNewCollectionDialog, setOpenAddNewCollectionDialog] =
    useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState("");
  function onClickAddCollection() {
    setOpenAddNewCollectionDialog(true);
  }
  function onClickCollection(collectionName: string) {
    history.push(`/collection-detail/${collectionName}`);
  }

  function onClickDeleteCollection(
    e: { stopPropagation: () => void },
    collectionToDeleted: string,
  ) {
    e.stopPropagation();
    setCollectionToDelete(collectionToDeleted);
  }

  if (animeCollection.length > 0) {
    return (
      <>
        <S.Wrapper>
          <h2>My Collection</h2>
          <Button
            className="add-new-collection"
            variant="contained"
            onClick={onClickAddCollection}
          >
            Add New Collection
          </Button>
          <S.ContainerGrid container spacing={1}>
            {animeCollection.map((collection) => {
              return (
                <S.SubGrid key={collection.name} xs={6} sm={4} md={3}>
                  <S.StyledCard
                    onClick={() => onClickCollection(collection.name)}
                    variant="outlined"
                  >
                    <img
                      src={collection.thumbnail || defaultThumbnail}
                      alt={"collection thumbnail"}
                    />
                    <div>{collection.name}</div>
                    <S.StyledCancelIcon
                      onClick={(e) =>
                        onClickDeleteCollection(e, collection.name)
                      }
                    />
                  </S.StyledCard>
                </S.SubGrid>
              );
            })}
          </S.ContainerGrid>
        </S.Wrapper>
        {openAddNewCollectionDialog && (
          <AddNewCollectionModal
            onClose={() => setOpenAddNewCollectionDialog(false)}
          />
        )}
        {collectionToDelete && (
          <DeleteCollectionModal
            onClose={() => setCollectionToDelete("")}
            collectionName={collectionToDelete}
          />
        )}
      </>
    );
  }
  return <>Empty Data</>;
};

export default CollectionList;
