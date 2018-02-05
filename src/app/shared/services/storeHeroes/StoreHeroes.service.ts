import { Action } from '@ngrx/store';
import Hero from '../../models/heroes/hero';

export const UPDATE = 'UPDATE';
export const CREATE = 'CREATE';
export const RESET = 'RESET';
let initialValue: Array<Hero> = [];

export function storeHeroes(heroesList: Array<Hero> = [], action: Action) {
  switch (action.type) {
    case UPDATE:
      const update: any = action;
      if (heroesList.length - 1 >= update.payload.index) {
        heroesList[update.payload.index] = update.payload.newValue;
      }
      return heroesList;
    case CREATE:
      const create: any = action;
      initialValue = create.payload;
      heroesList = create.payload;
      return heroesList;
    case RESET:
      heroesList = initialValue;
      return heroesList;
    default:
      return heroesList;
  }
}

