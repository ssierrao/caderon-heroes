import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Hero from '../shared/models/heroes/hero';
import { StateService } from '@uirouter/core';
import { AppState, GetHeroes, UpdateHero } from '../shared/actions/heroes.actions';

@Component({
  selector: 'my-about',
  templateUrl: './hero-information.component.html',
  styleUrls: ['./hero-information.component.scss']
})
export class AboutComponent implements OnInit {
  private id: number;
  hero: Hero = {};

  constructor(private store: Store<AppState>, private $state: StateService) {
  }

  ngOnInit() {
    this.id = parseInt(this.$state.params.id, 10);
    const heroesStore = this.store.select('heroes').subscribe((heroes: Array<Hero>) => {
      if (heroes !== undefined && heroes.length > 0) {
        this.hero = heroes[this.id];
      } else {
        this.goBack();
      }
    });
    this.store.dispatch(new GetHeroes());
    heroesStore.unsubscribe();
  }

  goBack() {
    this.$state.go('home');
  }

  save() {
    const payload = {index: this.id, hero: this.hero};
    this.store.dispatch(new UpdateHero(payload));
    this.goBack();
  }
}
