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

export type PageInfo = {
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
};

export type AnimeListPage = {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
};
