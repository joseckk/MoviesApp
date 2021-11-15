import { NgModule } from '@angular/core';

import { MoviesListPageRoutingModule } from './movie-list-routing.module';

import { MovieListPage } from './movie-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    MoviesListPageRoutingModule,
    TranslateModule
  ],
  declarations: [MovieListPage]
})
export class MoviesListPageModule {}
