var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#country-form").submit(function(){
    event.preventDefault();
    let countryCode = $('#countryCode').val();
    // const exchange = ${body.quotes.USD}

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://www.apilayer.net/api/live?access_key=${apiKey}&currencies=${countryCode}&quotes`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('.showRate').text(`The exchange rate in ${countryCode} is ${Object.values(body.quotes)[0]}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
