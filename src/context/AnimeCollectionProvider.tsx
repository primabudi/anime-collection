import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ApolloClient } from "@apollo/client";
import { Anime } from "../types/anime";
import {
  GET_MULTIPLE_ANIME_DETAILS,
  MultipleAnimeListQuery,
} from "../graphql/getMultipleAnimeDetail";

interface CollectionLocalStorage {
  name: string;
  animeIds: number[];
}

interface CollectionReducer {
  name: string;
  animeList: Anime[];
}

const ADD_ANIME = "ADD_ANIME";

const animeCollectionReducer = (
  state: CollectionReducer[],
  action: { type: string; payload: CollectionReducer[] },
): CollectionReducer[] => {
  switch (action.type) {
    case ADD_ANIME:
      return action.payload;
    default:
      return state;
  }
};

// Create the anime collection context
const AnimeCollectionContext = createContext<{
  animeCollection: CollectionReducer[];
  addAnime: (collectionId: number, anime: Anime) => void;
  setInitialCollection: (collection: CollectionReducer[]) => void;
}>({
  animeCollection: [],
  addAnime: () => {},
  setInitialCollection: () => {},
});

const useAnimeCollection = () => {
  const [animeCollection, dispatch] = useReducer(animeCollectionReducer, []);

  // TODO: Implement this!
  const addAnime = (collectionId: number, anime: Anime) => {
    console.log(collectionId, anime);
    dispatch({ type: ADD_ANIME, payload: [] });
  };

  function setInitialCollection(collection: CollectionReducer[]) {
    dispatch({ type: ADD_ANIME, payload: collection });
  }

  return { animeCollection, addAnime, setInitialCollection };
};

export const useAnimeCollectionContext = () =>
  useContext(AnimeCollectionContext);

const fetchMultipleAnimeDetails = async (
  apolloClient: ApolloClient<any>,
  animeIds: number[],
): Promise<Anime[] | null> => {
  try {
    const { data } = await apolloClient.query<MultipleAnimeListQuery>({
      query: GET_MULTIPLE_ANIME_DETAILS,
      variables: { ids: animeIds },
    });

    if (data && data.Page) {
      return data.Page.media;
    }
  } catch (error) {
    console.error("Error fetching anime details:", error);
  }

  return null;
};

// Provide the context to the app's top-level component
const AnimeCollectionProvider: React.FC<{
  apolloClient: ApolloClient<any>;
  children: ReactNode;
}> = ({ apolloClient, children }) => {
  const { animeCollection, addAnime, setInitialCollection } =
    useAnimeCollection();

  // Load the anime collection from local storage on mount
  useEffect(() => {
    const storedCollection = localStorage.getItem("animeCollection");
    if (storedCollection) {
      const parsedCollection: CollectionLocalStorage[] =
        JSON.parse(storedCollection);
      Promise.all(
        parsedCollection.map(async (collection) => {
          const animeDetails = await fetchMultipleAnimeDetails(
            apolloClient,
            collection.animeIds,
          );

          // Filter out any null values (failed API requests)
          const filteredAnimeDetails = animeDetails?.filter(
            (details) => details !== null,
          ) as Anime[];

          const newCollection: CollectionReducer = {
            name: collection.name,
            animeList: filteredAnimeDetails,
          };
          return newCollection;
        }),
      ).then((collections) => {
        setInitialCollection(collections);
      });
    }
  }, []);

  // // Save the anime collection to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("animeCollection", JSON.stringify(animeCollection));
  // }, [animeCollection]);

  return (
    <AnimeCollectionContext.Provider
      value={{ animeCollection, addAnime, setInitialCollection }}
    >
      {children}
    </AnimeCollectionContext.Provider>
  );
};

export default AnimeCollectionProvider;
