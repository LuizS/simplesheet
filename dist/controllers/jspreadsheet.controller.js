"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standard_controller_1 = __importDefault(require("./standard.controller"));
class JSpreadsheetController extends standard_controller_1.default {
    constructor() {
        super("JSSpreadsheet", "jspreadsheet", ["jsuites.css", "jexcel.css"]);
    }
}
exports.default = JSpreadsheetController;
