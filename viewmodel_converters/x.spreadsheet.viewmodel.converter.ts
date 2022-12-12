import { Cell } from "../models/cell";
import StandardViewModelConverter from "./standard.viewmodel.converter"

export default class XSpreadsheetViewModelConverter extends StandardViewModelConverter{

    override convertToModel(row: number, column: number, content: string) : Cell {

        let cell: Cell = {
            row: row,
            column: column,
            content: content
        }

        return cell;
    }

    override convertToModels(data:any) : Cell[]{

        var entries =Object.entries(data);
        var result:Cell[] = [];

        entries.filter((value:any, key: any) => {return value[1].cells!==undefined})
                                .forEach((value: any) => {
                                    var subentries =Object.entries(value[1].cells);
                                  //  console.log(row);
                                    return subentries.forEach((cell: any, key: any) => result.push(this.convertToModel(parseInt(value[0]), parseInt(cell[0]), cell[1].text)));
                                });
        
        console.log(result);

        return result;
    
    }

    override convertToViewModels(cells: Cell[]) : string[][] | any {

        var viewModels:any = {};

        cells.forEach(e => {
            viewModels[e.row] = viewModels[e.row] || {cells:{}};
            viewModels[e.row].cells[e.column] = {text: e.content};
         });

         //console.log(viewModels);
         
         return viewModels;
        
    }

}