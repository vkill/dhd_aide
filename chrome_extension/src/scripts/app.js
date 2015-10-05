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
var welcome_hbs_template = require('./../view/welcome.hbs');

var document = window.document;

var app_css = require("./../styles/app.scss");

routes.add('', 'main_home')
routes.add('home', 'main_index')
routes.add('logout', 'main_logout')

routes.handler.main_index = function(params){
  var html = main_index_hbs_template();
  $('body').html(html);
};

routes.handler.main_logout = function(params){
  var html = "logout";
  $('body').html(html);
};

$(document).ready(function(){
  var html = welcome_hbs_template();
  $('body').html(html);
  $('#body_modal_loading').modal();

  routes.start();
})





