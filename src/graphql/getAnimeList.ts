import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query {
    Page(page: 1, perPage: 10) {
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
