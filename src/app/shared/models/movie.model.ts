export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre?: string[];
  year: number;
  duration: string;
  imdbRating: number;
  actors:  number[];
}
