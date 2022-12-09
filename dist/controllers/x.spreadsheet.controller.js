"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_repository_1 = __importDefault(require("../data/cell.repository"));
const xSpreadsheetController = {
    saveChange: async function (req, res) {
        let cell = {
            row: req.body.row,
            column: req.body.column,
            content: req.body.content
        };
        console.log(cell);
        cell_repository_1.default.save(cell);
        res.sendStatus(200);
    },
    saveAll: async function (req, res) {
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
        res.sendStatus(200);
    },
    showExcel: async function (res) {
        var items = await cell_repository_1.default.getAll();
        var mappedCells = {};
        items.forEach(e => {
            mappedCells[e.row] = mappedCells[e.row] || { cells: {} };
            mappedCells[e.row].cells[e.column] = { text: e.content };
        });
        res.render('xspreadsheet', { title: "App", Rows: mappedCells });
    }
};
exports.default = xSpreadsheetController;
