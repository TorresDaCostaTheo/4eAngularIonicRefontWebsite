import { Injectable } from '@angular/core';
import { Bateau } from '../models/bateau';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BateauxService {
  bateauList!: Bateau[];
  constructor(private http: HttpClient) {}

  getBateaux() {
    return this.http.get<Bateau[]>('assets/data/ListBateaux.json');
  }
  
}
