import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CreateHeroes, INIT_HEROES } from '../actions/heroes.actions';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '..';


@Injectable()
export class HeroEffect {

  @Effect({dispatch: true})
  loadHeroes$ = this.actions$.ofType(INIT_HEROES)
    .pipe(
      switchMap(() => {
        return this.apiService.getHeroesList().pipe(map(heroes => new CreateHeroes(heroes)));
      })
    );

  constructor(private actions$: Actions, private apiService: ApiService) {
  }


}
