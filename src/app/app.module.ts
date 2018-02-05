import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './hero-information/hero-information.component';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { IndexDecorator } from './shared/pipes/indexDecorator/index-decorator.pipe';
import { StoreModule } from '@ngrx/store';
import { storeHeroes } from './shared/services/storeHeroes/StoreHeroes.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    StoreModule.forRoot({ heroes: storeHeroes})
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
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
