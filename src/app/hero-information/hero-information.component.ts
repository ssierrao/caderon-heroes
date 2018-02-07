import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Hero from '../shared/models/heroes/hero';
import { Observable } from 'rxjs/Observable';
import { UPDATE } from '../shared/services/storeHeroes/StoreHeroes.service';
import { StateService } from '@uirouter/core';

interface AppState {
  heroes: Array<Hero>;
}

@Component({
  selector: 'my-about',
  templateUrl: './hero-information.component.html',
  styleUrls: ['./hero-information.component.scss']
})
export class AboutComponent implements OnInit {
  heroes$: Observable<Array<Hero>>;
  private id: number;
  hero: Hero = {};

  constructor(private store: Store<AppState>, private $state: StateService) {
  }

  ngOnInit() {
    this.id = parseInt(this.$state.params.id, 10);
    this.heroes$ = this.store.select('heroes');
    this.heroes$.take(1).subscribe(heroes => {
      if (heroes.length > this.id) {
        this.hero = JSON.parse(JSON.stringify(heroes[this.id]));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.$state.go('home');
  }

  save() {
    const payload = {index: this.id, newValue: this.hero};
    this.store.dispatch({type: UPDATE, payload});
    this.goBack();
  }
}
