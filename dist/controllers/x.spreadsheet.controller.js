"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_repository_1 = __importDefault(require("../data/cell.repository"));
const standard_controller_1 = __importDefault(require("./standard.controller"));
class XSpreadsheetController extends standard_controller_1.default {
    constructor() {
        super('x-spreadsheet', 'xspreadsheet', ["xspreadsheet.css"]);
    }
    async saveAll(req, res) {
        var data = JSON.parse(req.body.sheetData);
        var entries = Object.entries(data);
        var result = [];
        entries.filter((value, key) => { return value[1].cells !== undefined; })
            .forEach((value, row) => {
            var subentries = Object.entries(value[1].cells);
            return subentries.forEach((cell, key) => {
                // console.log(cell)
                result.push({
                    row: row,
                    column: cell[0],
                    content: cell[1].text
                });
            });
        });
        await cell_repository_1.default.saveAll(result);
        res.redirect("/");
    }
    async showExcel(res) {
        var items = await cell_repository_1.default.getAll();
        var mappedCells = {};
        items.forEach(e => {
            mappedCells[e.row] = mappedCells[e.row] || { cells: {} };
            mappedCells[e.row].cells[e.column] = { text: e.content };
        });
        res.render('xspreadsheet', { title: "x-spreadsheet example", cssFiles: ["xspreadsheet.css"], Rows: mappedCells });
    }
}
exports.default = XSpreadsheetController;
