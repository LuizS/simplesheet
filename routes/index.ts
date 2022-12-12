import { Router } from 'express';
import controller from '../controllers/x.spreadsheet.controller';
const routes = Router();

routes.get('/', function(req, res, next) {
  res.render("index", {title: "Home", cssFiles:["style.css"], jsFiles:[]})
});

module.exports = routes;
