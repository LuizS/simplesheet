import { Router } from 'express';
import JSpreadsheetController from '../controllers/jspreadsheet.controller';

const routes = Router();
const controller = new JSpreadsheetController();

routes.get('/', function(req, res) {
  void controller.showExcel(res);
});

routes.post('/saveAll', function(req, res) {
  void controller.saveAll(req,res);
});

module.exports = routes;
