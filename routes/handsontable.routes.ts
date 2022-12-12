import { Router } from 'express';
import HandsontableController from '../controllers/handsontable.controller';
import Controller from '../controllers/handsontable.controller';
const routes = Router();

var controller = new HandsontableController();

routes.get('/', function(req, res, next) {
  controller.showExcel(res);
});

routes.post('/saveAll', function(req, res) {
  controller.saveAll(req,res);
});

module.exports = routes;