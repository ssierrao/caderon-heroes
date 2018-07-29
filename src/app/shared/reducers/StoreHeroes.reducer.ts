import Hero from '../models/heroes/hero';
import { CREATE_HERO, GET_HERO, HeroesActions, INIT_HEROES, RESET_HERO, UPDATE_HERO } from '../actions/heroes.actions';

let initialValue: Array<Hero> = [];

export function storeHeroes(heroesList: Array<Hero> = [], action: HeroesActions) {
  switch (action.type) {
    case UPDATE_HERO:
      let heroes = [...heroesList];
      heroes = heroes.map((hero: Hero, index) => {
        return index === action.payload.index ? action.payload.hero : hero;
      });
      return heroes;
    case CREATE_HERO:
      initialValue = action.payload;
      return action.payload;
    case RESET_HERO:
      return initialValue;
    case INIT_HEROES:
      return heroesList;
    default:
      return heroesList;
  }
}

