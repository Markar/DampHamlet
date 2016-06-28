export class App {
  configureRouter(config, router) {
    config.title = 'Damp Hamlet';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title: 'Welcome' },
      { route: 'damphamlet',    name: 'damphamlet',   moduleId: 'damphamlet',   nav: true,  title: 'Play' },
      { route: 'changelog',     name: 'patchnotes',   moduleId: 'changelog',    nav: true,  title: 'History' },
    ]);

    this.router = router;
  }
}
