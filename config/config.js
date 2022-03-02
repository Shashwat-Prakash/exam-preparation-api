//check environment
var env = process.env.NODE_ENV || "Development";

//fetch config env
var config = require("./config.json");
var envConfig = config[env];
//add env config to process.env
Object.keys(envConfig).forEach(keys => (process.env[keys] = envConfig[keys]));
