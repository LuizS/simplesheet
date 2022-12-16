import { Router } from 'express'
import HandsontableController from '../controllers/handsontable.controller'
const routes = Router()

const controller = new HandsontableController()

routes.get('/', function (req, res) {
  void controller.showExcel(res)
})

routes.post('/saveAll', function (req, res) {
  void controller.saveAll(req, res)
})

module.exports = routes
