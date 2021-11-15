import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.baseApi}/movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.baseApi}/movies/${id}`);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${environment.baseApi}/movies/${movie.id}`, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${environment.baseApi}/movies/${id}`);
  }

  getNewMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${environment.baseApi}/movies`, movie);
  }
}
