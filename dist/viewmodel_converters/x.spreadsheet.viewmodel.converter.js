"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standard_viewmodel_converter_1 = __importDefault(require("./standard.viewmodel.converter"));
class XSpreadsheetViewModelConverter extends standard_viewmodel_converter_1.default {
    convertToModel(row, column, content) {
        let cell = {
            row: row,
            column: column,
            content: content
        };
        return cell;
    }
    convertToModels(data) {
        var entries = Object.entries(data);
        var result = [];
        entries.filter((value, key) => { return value[1].cells !== undefined; })
            .forEach((value) => {
            var subentries = Object.entries(value[1].cells);
            //  console.log(row);
            return subentries.forEach((cell, key) => result.push(this.convertToModel(parseInt(value[0]), parseInt(cell[0]), cell[1].text)));
        });
        console.log(result);
        return result;
    }
    convertToViewModels(cells) {
        var viewModels = {};
        cells.forEach(e => {
            viewModels[e.row] = viewModels[e.row] || { cells: {} };
            viewModels[e.row].cells[e.column] = { text: e.content };
        });
        //console.log(viewModels);
        return viewModels;
    }
}
exports.default = XSpreadsheetViewModelConverter;
