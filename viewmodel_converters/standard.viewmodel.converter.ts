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
            for (var column=0;column<data[row].length;column++){
                result.push({
                    row: row,
                    column: column,
                    content: data[row][column]
                });
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