import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class{

	constructor(router){
		this.router = router;
	}
	configure(){
		var appRouterConfig = function(config){
		    config.title = 'Enter Reserves';
		    config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
		    config.map([
              { route: ['', 'EnterReserves'], name: 'EnterReserves', moduleId: 'EnterReserves', nav: true, title:'Enter Reserves', auth: true },
              { route: ['CreateSales'], name: 'CreateSales', moduleId: 'CreateSales', nav: true, title:'Create Sales', auth: true },
              { route: ['EditSales'], name: 'EditSales', moduleId: 'EditSales', nav: true, title:'Edit Sales', auth: true },
              { route: ['login'], moduleId: 'Login', nav: false, title:'Login' },
              { route: ['logout'], moduleId: 'Logout', nav: false, title:'Logout' }
              //{ route: ['welcome'],  name: 'welcome',      moduleId: 'welcome',      nav: true, title:'Welcome' },
              //{ route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title:'Github Users' },
              //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
		    ]);
		};

		this.router.configure(appRouterConfig);	
	}
}