//import {inject} from 'aurelia-framework';
//import HttpClientConfig from 'aurelia-auth/app.httpClient.config';
//import {AuthorizeStep} from 'aurelia-auth';

//@inject(HttpClientConfig)
export class App {
    constructor() {
        //this.httpClientConfig = httpClientConfig;
    }

    activate() {
        //this.httpClientConfig.configure();
    }
  
  configureRouter(config, router){
    config.title = 'Enter Reserves';
    //config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
    config.map([
      { route: ['', 'EnterReserves'], name: 'EnterReserves', moduleId: 'EnterReserves', nav: true, title:'Enter Reserves'},
      { route: ['CreateSales'], name: 'CreateSales', moduleId: 'CreateSales', nav: true, title:'Create Sales'},
      { route: ['EditSales'], name: 'EditSales', moduleId: 'EditSales', nav: true, title:'Edit Sales'}
	  //{ route: ['Login'], moduleId: 'Login', nav: false, title:'Login' },
	  //{ route: ['Logout'], moduleId: 'Logout', nav: false, title:'Logout' }
      //{ route: ['welcome'],  name: 'welcome',      moduleId: 'welcome',      nav: true, title:'Welcome' },
      //{ route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title:'Github Users' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
//Comment everything above when using below
//import {inject} from 'aurelia-framework';
//import {Router} from 'aurelia-router';
//import AppRouterConfig from 'app.router.config';
//import HttpClientConfig from 'aurelia-auth/app.httpClient.config';

//@inject(Router,HttpClientConfig,AppRouterConfig)
//export class App {

//    constructor(router, httpClientConfig, appRouterConfig){
//        this.router = router;
//        this.httpClientConfig = httpClientConfig;
//        this.appRouterConfig = appRouterConfig;
//    }
  
//    activate(){
    
//        this.httpClientConfig.configure();
//        this.appRouterConfig.configure();
//    }
//}