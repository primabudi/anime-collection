import { gql } from "@apollo/client";
import { Anime, PageInfo } from "../types/anime";

export type AnimeListQuery = {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
};
export const GET_ANIME_LIST = gql`
  query GetAnimeList($id: Int!) {
    Page(page: $id, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
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
      }
    }
  }
`;
