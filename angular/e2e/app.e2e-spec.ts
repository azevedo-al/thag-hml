import { SistemaDeGestaoTemplatePage } from './app.po';

describe('SistemaDeGestao App', function() {
  let page: SistemaDeGestaoTemplatePage;

  beforeEach(() => {
    page = new SistemaDeGestaoTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
