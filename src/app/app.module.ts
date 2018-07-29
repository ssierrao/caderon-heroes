import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './hero-information/hero-information.component';
import { ApiService } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { MAIN_STATES } from './router.config';
import { IndexDecorator } from './shared/pipes/indexDecorator/index-decorator.pipe';
import { StoreModule } from '@ngrx/store';
import { storeHeroes } from './shared/reducers/StoreHeroes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './shared/effects';

@NgModule({
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      otherwise: {state: 'home'},
      useHash: true,
    }),
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({heroes: storeHeroes}),
    EffectsModule.forRoot(effects)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    IndexDecorator
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
