import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface CollectionLocalStorage {
  name: string;
  animeIds: number[];
  thumbnail: string;
}

interface CollectionReducer {
  name: string;
  animeIds: number[];
  thumbnail: string;
}

const SET_ANIME = "SET_ANIME";

const animeCollectionReducer = (
  state: CollectionReducer[],
  action: { type: string; payload: CollectionReducer[] },
): CollectionReducer[] => {
  switch (action.type) {
    case SET_ANIME:
      return action.payload;
    default:
      return state;
  }
};

// Create the anime collection context
const AnimeCollectionContext = createContext<{
  animeCollection: CollectionReducer[];
  addAnime: (collectionName: string, animeIds: number[]) => void;
  createNewCollection: (
    collectionName: string,
    animeIds: number[],
    thumbnail: string,
  ) => void;
  setInitialCollection: (collection: CollectionReducer[]) => void;
  deleteCollection: (collectionName: string) => void;
  deleteAnime: (
    collectionName: string,
    animeIds: number[],
    thumbnail?: string,
  ) => void;
}>({
  animeCollection: [],
  addAnime: () => {},
  createNewCollection: () => {},
  setInitialCollection: () => {},
  deleteCollection: () => {},
  deleteAnime: () => {},
});

const useAnimeCollection = () => {
  const [animeCollection, dispatch] = useReducer(animeCollectionReducer, []);

  const addAnime = (collectionName: string, animeIds: number[]) => {
    const newCollection: CollectionReducer[] = animeCollection.map((col) => {
      if (col.name !== collectionName) {
        return col;
      }
      const newAnimeIds = [...col.animeIds, ...animeIds];
      return {
        ...col,
        animeIds: newAnimeIds,
      };
    });
    localStorage.setItem("animeCollection", JSON.stringify(newCollection));
    dispatch({ type: SET_ANIME, payload: newCollection });
  };

  const createNewCollection = (
    collectionName: string,
    animeIds: number[],
    thumbnail: string,
  ) => {
    const newCollection: CollectionReducer[] = [
      ...animeCollection,
      { name: collectionName, animeIds: animeIds, thumbnail: thumbnail },
    ];
    localStorage.setItem("animeCollection", JSON.stringify(newCollection));
    dispatch({ type: SET_ANIME, payload: newCollection });
  };

  function setInitialCollection(collection: CollectionReducer[]) {
    dispatch({ type: SET_ANIME, payload: collection });
  }

  function deleteCollection(collectionName: string) {
    const newCollection: CollectionReducer[] = animeCollection.filter((col) => {
      return col.name !== collectionName;
    });
    localStorage.setItem("animeCollection", JSON.stringify(newCollection));
    dispatch({ type: SET_ANIME, payload: newCollection });
  }

  function deleteAnime(
    collectionName: string,
    animeIds: number[],
    thumbnail?: string,
  ) {
    const newCollection: CollectionReducer[] = animeCollection.map((col) => {
      if (col.name !== collectionName) {
        return col;
      }
      const newAnimeIds = col.animeIds.filter((id) => id !== animeIds[0]);
      return {
        ...col,
        animeIds: newAnimeIds,
        thumbnail: thumbnail ? thumbnail : col.thumbnail,
      };
    });
    localStorage.setItem("animeCollection", JSON.stringify(newCollection));
    dispatch({ type: SET_ANIME, payload: newCollection });
  }

  return {
    animeCollection,
    addAnime,
    createNewCollection,
    setInitialCollection,
    deleteCollection,
    deleteAnime,
  };
};

export const useAnimeCollectionContext = () =>
  useContext(AnimeCollectionContext);

// Provide the context to the app's top-level component
const AnimeCollectionProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const {
    animeCollection,
    addAnime,
    createNewCollection,
    setInitialCollection,
    deleteCollection,
    deleteAnime,
  } = useAnimeCollection();

  // Load the anime collection from local storage on mount
  useEffect(() => {
    const storedCollection = localStorage.getItem("animeCollection");
    if (storedCollection) {
      const parsedCollection: CollectionLocalStorage[] =
        JSON.parse(storedCollection);
      Promise.all(
        parsedCollection.map(async (collection) => {
          const newCollection: CollectionReducer = {
            name: collection.name,
            animeIds: collection.animeIds,
            thumbnail: collection.thumbnail,
          };
          return newCollection;
        }),
      ).then((collections) => {
        setInitialCollection(collections);
      });
    }
  }, []);

  return (
    <AnimeCollectionContext.Provider
      value={{
        animeCollection,
        addAnime,
        createNewCollection,
        setInitialCollection,
        deleteCollection,
        deleteAnime,
      }}
    >
      {children}
    </AnimeCollectionContext.Provider>
  );
};

export default AnimeCollectionProvider;
