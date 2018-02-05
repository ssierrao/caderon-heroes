import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Hero from '../shared/models/heroes/hero';
import { Observable } from 'rxjs/Observable';
import { UPDATE } from '../shared/services/storeHeroes/StoreHeroes.service';

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

  constructor(private route: ActivatedRoute, private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.url.map(x => x.path)[0], 10);
    this.heroes$ = this.store.select('heroes');
    this.heroes$.take(1).subscribe(heroes => {
      if (heroes.length > this.id) {
        this.hero = heroes[this.id];
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.router.navigate(['']);
  }

  save() {
    const payload = {index: this.id, newValue: this.hero};
    this.store.dispatch({type: UPDATE, payload});
    this.goBack();
  }
}
