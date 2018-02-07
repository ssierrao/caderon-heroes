import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Hero from './models/heroes/hero';
import { CREATE } from './services/storeHeroes/StoreHeroes.service';
import { Store } from '@ngrx/store';

interface AppState {
  heroes: Array<Hero>;
}

@Injectable()
export class ApiService {
  heroes$: Observable<Array<Hero>>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.heroes$ = store.select('heroes');
  }

  private fixHeightFromFtToMtWith2Decimals(height: number): number {
    return height * 0.3048;
  }

  getHeroesList(): Observable<Array<Hero>> {
    let heroes = [];
    this.heroes$.take(1).subscribe(s => {
      heroes = s;
    });
    if (heroes && heroes.length) {
      return this.heroes$.take(1);
    }
    return this.http.get('http://udem.herokuapp.com/heroes').map((response: any): Array<Hero> => {
      response.forEach((hero: Hero) => {
        hero._height = this.fixHeightFromFtToMtWith2Decimals(hero._height);
      });
      this.store.dispatch({type: CREATE, payload: response});
      return response;
    });
  }
}
