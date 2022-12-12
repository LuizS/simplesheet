"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const x_spreadsheet_viewmodel_converter_1 = __importDefault(require("../viewmodel_converters/x.spreadsheet.viewmodel.converter"));
const standard_controller_1 = __importDefault(require("./standard.controller"));
class XSpreadsheetController extends standard_controller_1.default {
    constructor() {
        super('x-spreadsheet', 'xspreadsheet', ["xspreadsheet.css"], ["xspreadsheet.js", "de.js"], new x_spreadsheet_viewmodel_converter_1.default());
    }
}
exports.default = XSpreadsheetController;
