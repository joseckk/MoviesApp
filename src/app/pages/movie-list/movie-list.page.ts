import { Component, OnInit} from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  movies: Movie[] = [];
  exp = /,/g;
  state: 'loading' | 'loaded' | 'error' = 'loading';
  isChanged = true;

  constructor(
    private moviesService: MoviesService,
    private translateService: TranslateService
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.getMovies().subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.state = 'loaded';
      }, (error) =>  {
        this.state = 'error';
    });
  }

  onChangedLanguage(isChanged: boolean) {
    if (isChanged === true) {
      this.isChanged = false;
      this.translateService.use('es');
    } else {
      this.isChanged = true;
      this.translateService.use('en');
    }
  }
}
