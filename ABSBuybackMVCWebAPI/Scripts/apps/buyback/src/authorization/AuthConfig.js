var configForDevelopment = {
    providers: {
        google: {
            clientId: ''
        }
        ,
        linkedin:{
            clientId:''
        },
        facebook:{
            clientId:''
        }
    },
    loginRoute: "Login",
    loginUrl:"/Token"
};

var configForProduction = {
    providers: {
        google: {
            clientId: ''
        }
        ,
        linkedin:{
            clientId:''
        },
        facebook:{
            clientId:''
        }

    },
    loginRoute: "Login",
    loginUrl:"/Token"
};
var config ;
if (window.location.hostname==='localhost') {
    config = configForDevelopment;
}
else{
    config = configForProduction;
}


export default config;