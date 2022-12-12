import { Router } from 'express';
import JSpreadsheetController from '../controllers/jspreadsheet.controller';
const routes = Router();
const controller = new JSpreadsheetController();

routes.get('/', function(req, res, next) {
  controller.showExcel(res);
});

routes.post('/saveAll', function(req, res) {
  controller.saveAll(req,res);
});

module.exports = routes;
