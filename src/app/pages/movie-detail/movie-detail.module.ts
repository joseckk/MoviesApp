import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { MovieDetailPage } from './movie-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    MovieDetailPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [MovieDetailPage]
})
export class MovieDetailPageModule {}
