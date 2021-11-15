import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${environment.baseApi}/actors`);
  }

  getActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${environment.baseApi}/actors/${id}`);
  }

  updateActor(actor: Actor): Observable<Actor> {
    return this.http.put<Actor>(`${environment.baseApi}/actors/${actor.id}`, actor);
  }
}
