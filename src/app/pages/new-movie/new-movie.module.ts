import { NgModule } from '@angular/core';

import { NewMoviePageRoutingModule } from './new-movie-routing.module';

import { NewMoviePage } from './new-movie.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    NewMoviePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [NewMoviePage]
})
export class NewMoviePageModule {}
