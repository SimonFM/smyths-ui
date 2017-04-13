import { SmythsUiPage } from './app.po';

describe('smyths-ui App', function() {
  let page: SmythsUiPage;

  beforeEach(() => {
    page = new SmythsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
