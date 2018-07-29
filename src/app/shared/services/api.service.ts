import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Hero from '../models/heroes/hero';
import { Store } from '@ngrx/store';

interface AppState {
  heroes: Array<Hero>;
}

@Injectable()
export class ApiService {
  heroes$: Observable<Array<Hero>>;

  private static fixHeightFromFtToMt(height: number): number {
    return height * 0.3048;
  }

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.heroes$ = store.select('heroes');
  }

  getHeroesList(): Observable<Array<Hero>> {
    return this.http.get('http://udem.herokuapp.com/heroes').map((response: any): Array<Hero> => {
      response.forEach((hero: Hero) => {
        hero._height = ApiService.fixHeightFromFtToMt(hero._height);
      });
      return response;
    });
  }
}
