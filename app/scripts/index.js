var Handlebars = require('handlebars');
var $ = require ('jquery');
var _ = require ('underscore');


var source = $('#etsy-listing-template').html();
var template = Handlebars.compile(source);

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/

fetchJSONP(url, function(data) {
  _.each(data.results, function(listing){
    console.log(listing);

      var context = {
          title: listing.title,
          image: listing.Images[0].url_170x135,
          shop:  listing.Shop.shop_name,
          price: '$' + listing.price
      };

      $('#etsy-listing').append(template(context));
  });
});

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
