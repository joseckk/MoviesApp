export interface Companie {
  id: number;
  name: string;
  country: string;
  createYear: number;
  employees: number;
  rating: number;
  movies?: number[];
}
