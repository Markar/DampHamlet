export class App {
  configureRouter(config, router) {
    config.title = 'Damp Hamlet';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title: 'Welcome' },
      { route: 'game',          name: 'game',         moduleId: 'game',         nav: false, title: 'old' },
      { route: 'damphamlet',    name: 'damphamlet',   moduleId: 'damphamlet',   nav: true,  title: 'Play' },
      { route: 'changelog',     name: 'patchnotes',   moduleId: 'changelog',    nav: true,  title: 'Patch Notes' },
    ]);

    this.router = router;
  }
}
