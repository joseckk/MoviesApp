import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TraslateService {

  constructor( private translate: TranslateService) {
    this.translate.setDefaultLang('en');
   }
}
