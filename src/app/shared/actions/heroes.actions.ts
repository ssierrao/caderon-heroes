import { Action } from '@ngrx/store';
import Hero from '../models/heroes/hero';

export const UPDATE_HERO = 'UPDATE';
export const CREATE_HERO = 'CREATE';
export const RESET_HERO = 'RESET';
export const INIT_HEROES = 'INIT';
export const GET_HERO = 'GET_HERO';

export interface AppState {
  heroes: Array<Hero>;
}

export class UpdateHero implements Action {
  readonly type = UPDATE_HERO;
  constructor(public payload: { index: number, hero: Hero }) {
  }
}

export class CreateHeroes implements Action {
  readonly type = CREATE_HERO;
  constructor(public payload: Array<Hero>) {
  }
}

export class ResetHeroes implements Action {
  readonly type = RESET_HERO;
}

export class InitHeroes implements Action {
  readonly type = INIT_HEROES;
}

export class GetHeroes implements Action {
  readonly type = GET_HERO;
}

export type HeroesActions = UpdateHero | CreateHeroes | ResetHeroes | InitHeroes | GetHeroes;
