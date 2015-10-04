var routes = require("./app/routes");

window.routes = routes

routes.add('posts', 'posts_index');
routes.add('posts/{id}', 'posts_show', {rules: {id: /^[\d]+$/}});

routes.start();



