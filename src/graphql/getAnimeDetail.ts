import { gql } from "@apollo/client";
export const GET_ANIME_DETAIL = gql`
  query GetAnimeDetails($id: Int!) {
    Media(id: $id, type: ANIME) {
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
      episodes
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      studios(isMain: true) {
        nodes {
          name
        }
      }
      characters {
        nodes {
          id
          name {
            full
          }
          image {
            large
            medium
          }
        }
      }
    }
  }
`;

export type AnimeDetailQuery = {
  Media: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
      native: string;
    };
    coverImage: {
      large: string;
      medium: string;
    };
    description: string;
    averageScore: number;
    genres: string[];
    episodes: number | null;
    status: string;
    startDate: {
      year: number;
      month: number;
      day: number;
    } | null;
    endDate: {
      year: number;
      month: number;
      day: number;
    } | null;
    season: string | null;
    seasonYear: number | null;
    studios: {
      name: string;
    }[];
    characters: {
      nodes: {
        id: number;
        name: {
          full: string;
        };
        image: {
          large: string;
          medium: string;
        };
      }[];
    };
  };
};
