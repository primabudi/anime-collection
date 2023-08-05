import { gql } from "@apollo/client";
import { Anime } from "../types/anime";

export const GET_MULTIPLE_ANIME_DETAILS = gql`
  query GetAnimeDetails($ids: [Int]) {
    Page {
      media(id_in: $ids) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        description
        averageScore
        genres
        # Add any other fields you want to fetch
      }
    }
  }
`;

export type MultipleAnimeListQuery = {
  Page: {
    media: Anime[];
  };
};
