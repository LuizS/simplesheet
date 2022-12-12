import { Cell } from "../models/cell";

export default class StandardViewModelConverter{

    convertToModel(row: number, column: number, content: string) : Cell {

        let cell: Cell = {
            row: row,
            column: column,
            content: content
        }

        return cell;
    }

    convertToModels(data:string[][]|any) : Cell[]{

        var result:Cell[] = [];

        // console.log(data);

        for (var row=0;row<data.length;row++){
            if (data[row] !== undefined){
                for (var column=0;column<data[row].length;column++){
                    if (data[row][column] !== undefined)
                        result.push(this.convertToModel(row, column,data[row][column]));
                }
            }
        }
        
        return result;
    
    }

    convertToViewModels(cells: Cell[]) : string[][] | any  {

        var viewModels:string[][] = [];

        cells.forEach(e => {
            viewModels[e.row] = viewModels[e.row] || [];
            viewModels[e.row][e.column] =e.content;
         });

         return viewModels;
        
    }

}