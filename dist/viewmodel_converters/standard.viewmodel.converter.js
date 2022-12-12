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
            if (data[row] !== undefined) {
                for (var column = 0; column < data[row].length; column++) {
                    if (data[row][column] !== undefined)
                        result.push(this.convertToModel(row, column, data[row][column]));
                }
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
