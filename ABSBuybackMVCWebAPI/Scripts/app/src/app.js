export class App {
  configureRouter(config, router){
    config.title = 'Buybacks Needing Reserves';
    config.map([
      { route: ['','BuybackManagement'],  name: 'BuybackManagement',      moduleId: 'BuybackManagement',      nav: true, title:'Buybacks Needing Reserves' },
      { route: ['BuybackVehicleSearch'],  name: 'BuybackVehicleSearch',      moduleId: 'BuybackVehicleSearch',      nav: true, title:'Buyback Vehicle Search' }//,
      //{ route: ['welcome'],  name: 'welcome',      moduleId: 'welcome',      nav: true, title:'Welcome' },
      //{ route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title:'Github Users' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
