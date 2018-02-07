import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared';
import { StateService } from '@uirouter/core';
import Hero from '../shared/models/heroes/hero';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroes: Array<Hero>;

  constructor(private apiService: ApiService, private $state: StateService) {
  }

  ngOnInit() {
    this.apiService.getHeroesList().subscribe(
      result => {
        this.heroes = result;
      }
    );
  }

  getInfo(index: number) {
    this.$state.go('about', {id: index});
  }

}
