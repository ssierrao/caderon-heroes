import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
  });

  it('should have an url', () => {
    AppComponent.hello();
  });

});
