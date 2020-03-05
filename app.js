//Start Project
const stocks = require("./stocks");

/*
https://nodejs.org/api/process.html#process_process_argv
The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched. 
The first element will be process.execPath. See process.argv0 if access to the original value of argv[0] is needed. 
The second element will be the path to the JavaScript file being executed. 
The remaining elements will be any additional command line arguments.
*/
const query = process.argv.slice(2).join(" ");

stocks.get(query);
