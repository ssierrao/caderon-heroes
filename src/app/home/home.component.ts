import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared';
import Hero from '../shared/models/heroes/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroes: Array<Hero>;

  constructor(private apiService: ApiService, private router: Router) {
    // Do stuff
  }

  ngOnInit() {
    this.apiService.getHeroesList().subscribe(
      result => {
        this.heroes = result;
      }
    );
  }

  getInfo(index: number) {
    this.router.navigate([index]);
  }

}
