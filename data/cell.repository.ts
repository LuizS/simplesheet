import db from './db';
import { Cell } from '../models/cell';

const dbModel = db("sheetContents");
const cellRepository = {

    getAll: async(): Promise<Cell[]> => {

        const cursor = dbModel.getAll();

        let cells:Cell[] = [];

        if (cursor !== undefined)
        {
            await cursor.forEach(e => {
                let cell: Cell = {
                    column: e.column,
                    row: e.row,
                    content: e.content     
                 }
                cells.push(cell);
             });
    
             // console.log(cells.length);

             cursor.close();
        }

        return cells;

    }  ,
    save: async (cell: Cell) => dbModel.save(cell, {column: cell.column, row: cell.row}),
    saveAll: async (data: Cell[]) => dbModel.saveAll(data)
}
export default cellRepository;