import { Cell } from "../models/cell";
import XSpreadsheetCell from "../models/x.spreadsheet.cell";
import XSpreadsheetRow from "../models/x.spreadsheet.row";
import StandardViewModelConverter from "./standard.viewmodel.converter"

export default class XSpreadsheetViewModelConverter extends StandardViewModelConverter{

    override convertToModel(row: number, column: number, content: string) : Cell {

        const cell: Cell = {
            row: row,
            column: column,
            content: content
        }

        return cell;
    }

    override convertToModels(data:object) : Cell[]{

        const viewModel = data as Record<string,XSpreadsheetRow>;
        const keys =Object.keys(viewModel);
        const result:Cell[] = [];

        keys.forEach((rowNumber:string) => {
            if (viewModel[rowNumber].cells !== undefined ){
                Object.keys(viewModel[rowNumber].cells).forEach((columnNumber) => {
                    const cell = viewModel[rowNumber].cells[parseInt(columnNumber)];
                    result.push(this.convertToModel(parseInt(rowNumber), parseInt(columnNumber), cell.text));
                })                
            }
        });

        return result;
    
    }

    override convertToViewModels(cells: Cell[]) : string[][] | unknown {

        const viewModels:Record<number,XSpreadsheetRow> = {};
 
        cells.forEach(e => {
             viewModels[e.row] = viewModels[e.row] || {
                cells : {}
            } as XSpreadsheetRow;
            viewModels[e.row].cells[e.column] = {text: e.content} as XSpreadsheetCell;
         });
        
         return viewModels;
        
    }


}