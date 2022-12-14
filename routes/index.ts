import { Router } from 'express';
const routes = Router();

routes.get('/', function(req, res) {
  void res.render("index", {title: "Home", cssFiles:["style.css"], jsFiles:[]})
});

module.exports = routes;
