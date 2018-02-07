import { Ng2StateDeclaration } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './hero-information/hero-information.component';

/** The top level state(s) */
export let MAIN_STATES: Ng2StateDeclaration[] = [
  // The top-level app state.
  // This state fills the root <ui-view></ui-view> (defined in index.html) with the AppComponent
  {name: 'home', url: '', component: HomeComponent},

  // This is the Future State for lazy loading the BazModule
  {name: 'about', url: ':id', component: AboutComponent}
];

export default class AppRoutes {
  constructor($locationProvider: any) {
    $locationProvider.html5Mode(true);
  }
}
