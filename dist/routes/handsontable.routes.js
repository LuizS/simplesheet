"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handsontable_controller_1 = __importDefault(require("../controllers/handsontable.controller"));
const routes = (0, express_1.Router)();
var controller = new handsontable_controller_1.default();
routes.get('/', function (req, res, next) {
    controller.showExcel(res);
});
routes.post('/saveAll', function (req, res) {
    controller.saveAll(req, res);
});
module.exports = routes;
