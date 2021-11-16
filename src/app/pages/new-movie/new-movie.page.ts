import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { take } from 'rxjs/operators';
import { Actor } from 'src/app/shared/models/actor.model';
import { Companie } from 'src/app/shared/models/companie.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { isNotValidDuration, isNotValidRating, isNotValidUrl, isNotValidYear } from 'src/app/utils/validators.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.page.html',
  styleUrls: ['./new-movie.page.scss'],
})
export class NewMoviePage implements OnInit {
  movieForm: FormGroup;
  movie: Movie = null;
  companieId: number = null;
  movies: Movie[] = [];
  actors: Actor[] = [];
  companies: Companie[] = [];
  companie: Companie = null;
  genres = [];
  state: 'loading' | 'loaded' | 'error' = 'loaded';
  isChanged = true;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private actorsService: ActorsService,
    private companiesService: CompaniesService,
    private router: Router,
    private translateService: TranslateService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      poster: ['', [Validators.required, isNotValidUrl]],
      genre: ['', [Validators.required]],
      year: ['', [Validators.required, isNotValidYear]],
      duration: ['', [Validators.required, isNotValidDuration]],
      imdbRating: ['', [Validators.required, isNotValidRating]],
      actors: ['', [Validators.required]],
      companieId: ['', [Validators.required]],
    });

    this.getGenres();
    this.getActors();
    this.getCompanies();
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

  getActors(): void {
    this.actorsService.getActors().subscribe(
      (actors: Actor[]) => {
        this.actors = actors;
      },
    );
  }

  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      (companies: Companie[]) => {
        this.companies = companies;
      },
    );
  }

  getGenres(): void {
    this.genres = ['Comedy', 'Musical', 'Romance', 'Horror',
    'Thriller', 'Drama', 'War', 'Adventure', 'Crime',
    'Action', 'Animation', 'Sci-Fi', 'Love'];
  }

  addNewMovie(): void {
    if (this.movieForm.valid) {
      this.movie = { ...this.movieForm.value } as Movie;
      this.movie.poster = 'https://dummyimage.com/400x600.png/1f12ff/ffffff';
      this.companieId = +this.movie['companieId'];
      delete this.movie['companieId'];
      if (this.checkMovie(this.movie.id)) {
        this.addMovie(this.movie);
        this.ngOnInit();
      }
    }
  }

  checkMovie(id: number): boolean {
    return this.moviesService.getMovie(id) !== undefined;
  }

  addMovie(movie: Movie): void {
    this.state = 'loading';
    this.moviesService.getNewMovie(movie).subscribe(
      async (movieSubs: Movie) => {
        this.state = 'loaded';
        this.updateActor(movieSubs);
        this.updateCompanie(this.companieId);
        this.router.navigate(['./movie-list']);
        const toast = await this.toastController.create({
          message: 'Se ha añadido la película correctamente.',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();
    }, (error) =>  {
      this.state = 'error';
    });
  }

  private updateActor(movieSubs: Movie) {
    movieSubs.actors.forEach((actorId) => {
      this.actorsService
        .getActor(actorId)
        .pipe(take(1))
        .subscribe((actorSubs) => {
          if (actorSubs.movies.indexOf(movieSubs.id) === -1) {
            actorSubs.movies.push(movieSubs.id);
            this.actorsService.updateActor(actorSubs).subscribe();
          }
        });
    });
  }

  private updateCompanie(companieId: number) {
    this.companiesService.getCompanie(companieId).subscribe((companieSubs) => {
      if (companieSubs.movies.indexOf(companieId) === -1) {
        companieSubs.movies.push(companieId);
        this.companiesService.updateCompanie(companieSubs).subscribe();
      }
    });
  }
}
