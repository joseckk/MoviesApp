import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Actor } from 'src/app/shared/models/actor.model';
import { Companie } from 'src/app/shared/models/companie.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movieForm: FormGroup;
  prevMovie: Movie = null;
  movie: Movie = null;
  movies: Movie[] = [];
  id: number = +this.router.snapshot.paramMap.get('id');
  actors: Actor[] = [];
  companies: Companie[] = [];
  companie: Companie = null;
  companieId: number = null;
  genres = [];
  state: 'loading' | 'loaded' | 'error' = 'loading';
  stateUpdate: 'loading' | 'loaded' | 'error' = 'loaded';
  stateDelete: 'loading' | 'loaded' | 'error' = 'loaded';
  isChanged = true;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private actorsService: ActorsService,
    private companiesService: CompaniesService,
    private router: ActivatedRoute,
    private router2: Router,
    private translateService: TranslateService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      year: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      imdbRating: ['', [Validators.required]],
      actors: ['', [Validators.required]],
      companieId: ['', [Validators.required]],
    });

    this.getActors();
    this.getCompanies();
    this.getGenres();
    this.getMovie();
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

  getGenres(): void {
    this.genres = ['Comedy', 'Musical', 'Romance', 'Horror',
    'Thriller', 'Drama', 'War', 'Adventure', 'Crime',
    'Action', 'Animation', 'Sci-Fi', 'Love'];
  }

  getCompanies(): void {
    this.companiesService.getCompanies().subscribe((companies: Companie[]) => {
      this.companies = companies;
      this.companies.forEach((com) => {
        if (com.movies.indexOf(this.id) !== -1) {
          this.companieId = +com.movies[com.movies.indexOf(this.id)];
          this.movieForm.controls['companieId'].setValue(this.companie);
        }
      });
    });
  }

  getCompanie(id: number): void {
    this.companiesService.getCompanies().subscribe((companies: Companie[]) => {});
  }

  getMovie(): void {
    this.moviesService.getMovie(this.id).subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.prevMovie = { ...movie };
        this.movieForm.patchValue({ ...this.movie });
        this.state = 'loaded';
      },
      (error) => {
        this.state = 'error';
      }
    );
  }

  updateMovie(): void {
    if (this.movieForm.valid) {
      if (this.id) {
        const movie: Movie = { id: this.id, ...this.movieForm.value };
        this.stateUpdate = 'loading';
        this.moviesService.updateMovie(movie).subscribe(
          async (movieSubs) => {
            this.stateUpdate = 'loaded';
            this.updateActor(movieSubs);
            this.updateCompanie(this.companieId);
            const toast = await this.toastController.create({
              message: 'Se ha modificado la película correctamente.',
              duration: 2000,
              position: 'top',
              color: 'primary'
            });
            toast.present();
        },
        (error) => {
          this.stateUpdate = 'error';
        });
      }
    }
  }

  deleteMovie(): void {
    this.stateDelete = 'loading';
    this.moviesService.deleteMovie(this.id).subscribe(
      async (movieSub) => {
        this.stateDelete = 'loaded';
        this.updateActor(this.movie);
        this.updateCompanie(this.companieId);
        this.router2.navigate(['./movie-list']);
        const toast = await this.toastController.create({
          message: 'Se ha eliminado la película correctamente.',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
    }, (error) =>  {
      this.state = 'error';
    });
  }

  private updateActor(movieSubs: Movie) {
    this.prevMovie.actors.forEach((actorId: number) => {
      if (movieSubs.actors.indexOf(actorId) === -1) {
        this.actorsService
          .getActor(actorId)
          .pipe(take(1))
          .subscribe((actorSubs) => {
            if (actorSubs.movies.indexOf(movieSubs.id) !== -1) {
              actorSubs.movies.splice(
                actorSubs.movies.indexOf(movieSubs.id),
                1
              );
              this.actorsService.updateActor(actorSubs).subscribe();
            }
          });
      }
    });
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
    const companieIdUpdate = +this.movieForm.controls['companieId'].value;
    if (this.companieId !== companieIdUpdate) {
      this.companiesService.getCompanie(this.companieId).subscribe((com) => {
        if (com.movies.indexOf(this.id) !== -1) {
          com.movies.splice(com.movies.indexOf(this.id), 1);
        }
      });
    }
    this.companiesService.getCompanie(companieId).subscribe((companieSubs) => {
      if (companieSubs.movies.indexOf(companieId) === -1) {
        companieSubs.movies.push(companieId);
        this.companiesService.updateCompanie(companieSubs).subscribe();
      }
    });
  }
}
