var window = require("window");
var chrome = require("chrome");
var $ = require("$");
var _ = require("lodash");

var handlebars = require('handlebars/runtime');
var handlebars_layouts = require('handlebars-layouts');
handlebars.registerHelper(handlebars_layouts(handlebars));

var options_layout_hbs_template = require('./../view/layouts/options.hbs');

handlebars.registerPartial('options_layout', options_layout_hbs_template);

var routes = require("./app/routes");
window.routes = routes;

var main_index_hbs_template = require('./../view/main/index.hbs');

var document = window.document;

routes.add('', 'main_home')
routes.add('posts', 'posts_index');
routes.add('posts/{id}', 'posts_show', {rules: {id: /^[\d]+$/}});

routes.handler.posts_show = function(params){
  var html = main_index_hbs_template();
  console.log(html)
  $('body').html(html);
};

routes.start();

window.main_index_hbs_template = main_index_hbs_template


