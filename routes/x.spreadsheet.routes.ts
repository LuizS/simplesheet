import { Router } from 'express';
import Controller from '../controllers/x.spreadsheet.controller';
const routes = Router();
const controller = new Controller();

routes.get('/', function(req, res, next) {
  controller.showExcel(res);
});

routes.post('/save', function(req, res) {
  controller.saveChange(req,res);
});

routes.post('/saveAll', function(req, res) {
  controller.saveAll(req,res);
});

module.exports = routes;
