export class App {
  configureRouter(config, router){
    config.title = 'Enter Reserves';
    config.map([
      { route: ['', 'EnterReserves'], name: 'EnterReserves', moduleId: 'EnterReserves', nav: true, title:'Enter Reserves'},
      { route: ['CreateSales'], name: 'CreateSales', moduleId: 'CreateSales', nav: true, title:'Create Sales'},
      { route: ['EditSales'], name: 'EditSales', moduleId: 'EditSales', nav: true, title:'Edit Sales'}
      //{ route: ['welcome'],  name: 'welcome',      moduleId: 'welcome',      nav: true, title:'Welcome' },
      //{ route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title:'Github Users' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}