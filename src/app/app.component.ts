import { Component, OnInit } from '@angular/core';

import '../style/app.scss';
import { AppState, InitHeroes } from './shared/actions/heroes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private store: Store<AppState>) {
    this.store.select('heroes');
  }

  ngOnInit(): void {
    this.store.dispatch(new InitHeroes());
  }
}
