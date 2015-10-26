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
    loginRoute: "Login"
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
    loginRoute: "Login"
};
var config ;
if (window.location.hostname==='localhost') {
    config = configForDevelopment;
}
else{
    config = configForProduction;
}


export default config;