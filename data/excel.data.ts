import db from './db';
import { Cell } from '../models/cell';
import {ObjectId}  from 'mongodb';

const dbModel = db("sheetContents");
const excelData = {

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
    get: async function(row: number, column:number){
        return dbModel.get({row: row, column: column})
    } ,
    save: async function(cell: Cell ) {

        var item = await this.get(cell.row,cell.column);

        item = item || {
            row: cell.row,
            column: cell.column,
            _id: new ObjectId()
        }

        item.content = cell.content;
        
        return dbModel.save(item);
    },
    saveAll: async function(data: Cell[] ) {
        return dbModel.saveAll(data);
    }
}
export default excelData;