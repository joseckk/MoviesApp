import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingFeedbackComponent } from './components/loading-feedback/loading-feedback.component';
import { TranslateButtonComponent } from './components/translate-button/translate-button.component';

@NgModule({
  declarations: [LoadingFeedbackComponent, TranslateButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingFeedbackComponent,
    TranslateButtonComponent
  ],
})
export class SharedModule { }
