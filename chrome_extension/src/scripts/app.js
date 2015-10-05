var routes = require("./app/routes");

window.routes = routes

routes.add('', 'main__home')
routes.add('posts', 'posts__index');
routes.add('posts/{id}', 'posts__show', {rules: {id: /^[\d]+$/}});

routes.handler.posts__show = function(params){
  console.log(params)
};

routes.start();



