"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StandardViewModelConverter {
    convertToModel(row, column, content) {
        let cell = {
            row: row,
            column: column,
            content: content
        };
        return cell;
    }
    convertToModels(data) {
        var result = [];
        // console.log(data);
        for (var row = 0; row < data.length; row++) {
            for (var column = 0; column < data[row].length; column++) {
                result.push({
                    row: row,
                    column: column,
                    content: data[row][column]
                });
            }
        }
        return result;
    }
    convertToViewModels(cells) {
        var viewModels = [];
        cells.forEach(e => {
            viewModels[e.row] = viewModels[e.row] || [];
            viewModels[e.row][e.column] = e.content;
        });
        return viewModels;
    }
}
exports.default = StandardViewModelConverter;
