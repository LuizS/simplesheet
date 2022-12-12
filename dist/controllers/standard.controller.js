"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_repository_1 = __importDefault(require("../data/cell.repository"));
class StandardController {
    constructor(componentName, viewName, cssFiles) {
        this.componentName = componentName;
        this.viewName = viewName;
        this.cssFiles = cssFiles;
    }
    async saveChange(req, res) {
        let cell = {
            row: req.body.row,
            column: req.body.column,
            content: req.body.content
        };
        console.log(cell);
        cell_repository_1.default.save(cell);
        res.sendStatus(200);
    }
    async saveAll(req, res) {
        var data = JSON.parse(req.body.sheetData);
        var result = [];
        console.log(data);
        for (var row = 0; row < data.length; row++) {
            for (var column = 0; column < data[row].length; column++) {
                result.push({
                    row: row,
                    column: column,
                    content: data[row][column]
                });
            }
        }
        console.log(result);
        await cell_repository_1.default.saveAll(result);
        res.redirect("/");
    }
    async showExcel(res) {
        var items = await cell_repository_1.default.getAll();
        var mappedCells = [];
        items.forEach(e => {
            mappedCells[e.row] = mappedCells[e.row] || [];
            mappedCells[e.row][e.column] = e.content;
        });
        res.render(this.viewName, { title: `${this.componentName} example`, cssFiles: this.cssFiles, Rows: mappedCells });
    }
}
exports.default = StandardController;
