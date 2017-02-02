var Handlebars = require('handlebars');
var $ = require ('jquery');
var _ = require ('underscore');


var source = $('#etsy-album-template').html();
var template = Handlebars.compile(source);

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

fetchJSONP(url, function(data) {
  _.each(data.results, function(album){
    console.log(album);

      var context = {
          title: album.title,
          image: album.Images[0].url_170x135,
          shop:  album.Shop.shop_name,
          price: '$' + album.price
      };

      $('#etsy-album').append(template(context));
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
