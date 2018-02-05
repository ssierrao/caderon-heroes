import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './hero-information/hero-information.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: AboutComponent}
];


export const routing = RouterModule.forRoot(routes);
