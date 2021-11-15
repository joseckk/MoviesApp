import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Companie } from '../models/companie.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Companie[]> {
    return this.http.get<Companie[]>(`${environment.baseApi}/companies`);
  }

  getCompanie(id: number): Observable<Companie> {
    return this.http.get<Companie>(`${environment.baseApi}/companies/${id}`);
  }

  updateCompanie(companie: Companie): Observable<Companie> {
    return this.http.put<Companie>(`${environment.baseApi}/companies/${companie.id}`,companie);
  }
}
