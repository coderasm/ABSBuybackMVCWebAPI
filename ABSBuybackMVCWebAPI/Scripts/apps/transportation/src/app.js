export class App {
  configureRouter(config, router) {
    config.title = 'Manage Transports';
    config.map([
      { route: ['', 'Transport'], name: 'Transport', moduleId: 'Transport', nav: true, title:'Transports'}
      //{ route: ['welcome'],  name: 'welcome',      moduleId: 'welcome',      nav: true, title:'Welcome' },
      //{ route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title:'Github Users' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
