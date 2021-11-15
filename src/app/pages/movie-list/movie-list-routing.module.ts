import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListPage } from './movie-list.page';

const routes: Routes = [
  {
    path: '',
    component: MovieListPage
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailPageModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesListPageRoutingModule {}
