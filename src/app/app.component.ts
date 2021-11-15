import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Movies', url: '/movie-list', icon: 'film' },
    { title: 'Create a new Movie', url: '/new-movie', icon: 'add' },
  ];
  constructor() {
  }
}
