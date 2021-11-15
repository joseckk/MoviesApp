import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingFeedbackComponent } from './components/loading-feedback/loading-feedback.component';

@NgModule({
  declarations: [LoadingFeedbackComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingFeedbackComponent
  ],
})
export class SharedModule { }
