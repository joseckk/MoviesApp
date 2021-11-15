export interface Actor {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  bornCity: string;
  birthdate: string;
  img?: string;
  rating: number;
  movies?: number[];
}
