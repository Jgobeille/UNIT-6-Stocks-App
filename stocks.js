//Requires
const https = require("https");
const http = require("http");

const api = require("./api.json");

module.exports.get = get;

//Make call to query
function get(query) {
  const apiCall = `https://finnhub.io/api/v1/stock/profile?symbol=${query}&token=${api.key}`;

  //try/catch for error Handling
  try {
    const request = https.get(apiCall, response => {
      //check if response code is good
      if (response.statusCode === 200) {
        let body = "";
        //read the data
        response.on("data", data => {
          //turn buffer data into string
          body += data.toString();
        });
        //after the end of the response and all the data has been passed through
        response.on("end", () => {
          try {
            //parse the JSON data into a string
            const appData = JSON.parse(body);
            console.log(
              `${appData.name}'s current share price is ${appData.shareOutstanding}`
            );
          } catch (error) {
            printError(error);
          }
        });
        //if status is not 200
      } else {
        const message = `There was an error getting the stockData for ${query} (${
          http.STATUS_CODES[response.statusCode]
        })`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on("error", error =>
      console.error(`Problem with request: ${printError(error)};`)
    );
  } catch (error) {
    printError(error);
  }
}

//error handling
function printError(error) {
  console.error(error.message);
}

//print message

module.exports.get = get;
