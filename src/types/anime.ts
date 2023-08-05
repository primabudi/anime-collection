export type Anime = {
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
};

export type AnimeDetail = {
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

export type PageInfo = {
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
};
