import { Router } from 'express';
import XSpreadsheetController from '../controllers/x.spreadsheet.controller';
const routes = Router();
const controller = new XSpreadsheetController();

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
