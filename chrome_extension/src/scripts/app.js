var window = require("window");
var chrome = require("chrome");
var $ = require("$")

var handlebars = require('handlebars/runtime');

var routes = require("./app/routes");
window.routes = routes;

var index_hbs_template = require('./../view/index.hbs');

var document = window.document;

routes.add('', 'main__home')
routes.add('posts', 'posts__index');
routes.add('posts/{id}', 'posts__show', {rules: {id: /^[\d]+$/}});

routes.handler.posts__show = function(params){
  var html = index_hbs_template();
  console.log(html)
  $('body').html(html);
};

routes.start();



