// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ApiService } from '../shared';
import { StateService } from '@uirouter/core';

class ApiServiceStub {
  getHeroesList() {

  }
}

describe('Home Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent], providers: [
        {provide: ApiService, useClass: ApiServiceStub}, {provide: StateService, useClass: StateService}
      ]
    });
  });

  describe('', () => {
    
  });

});

