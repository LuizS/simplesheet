"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_repository_1 = __importDefault(require("../data/cell.repository"));
const standard_viewmodel_converter_1 = __importDefault(require("../viewmodel_converters/standard.viewmodel.converter"));
class StandardController {
    constructor(componentName, viewName, cssFiles, jsFiles, viewModelConverter = new standard_viewmodel_converter_1.default()) {
        this.componentName = componentName;
        this.viewName = viewName;
        this.cssFiles = cssFiles;
        this.jsFiles = jsFiles;
        this.viewModelConverter = viewModelConverter;
    }
    async saveChange(req, res) {
        cell_repository_1.default.save(this.viewModelConverter.convertToModel(req.body.row, req.body.column, req.body.content));
        res.sendStatus(200);
    }
    async saveAll(req, res) {
        var data = JSON.parse(req.body.sheetData);
        await cell_repository_1.default.saveAll(this.viewModelConverter.convertToModels(data));
        res.redirect("/");
    }
    async showExcel(res) {
        var items = await cell_repository_1.default.getAll();
        var mappedCells = this.viewModelConverter.convertToViewModels(items);
        res.render(this.viewName, { title: `${this.componentName} example`, cssFiles: this.cssFiles, jsFiles: this.jsFiles, Rows: mappedCells });
    }
}
exports.default = StandardController;
