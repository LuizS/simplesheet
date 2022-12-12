"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handsontable_controller_1 = __importDefault(require("../controllers/handsontable.controller"));
const routes = (0, express_1.Router)();
routes.get('/', function (req, res, next) {
    handsontable_controller_1.default.showExcel(res);
});
routes.post('/saveAll', function (req, res) {
    handsontable_controller_1.default.saveAll(req, res);
});
module.exports = routes;
