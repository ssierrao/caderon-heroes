import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import Hero from '../shared/models/heroes/hero';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/actions/heroes.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroes$: Observable<Array<Hero>>;

  constructor(private store: Store<AppState>, private $state: StateService) {
  }

  ngOnInit() {
    this.heroes$ = this.store.select('heroes');
  }

  getInfo(index: number) {
    this.$state.go('about', {id: index});
  }

}
