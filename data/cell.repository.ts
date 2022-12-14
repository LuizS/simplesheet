import DbModel from './db.model';
import { Cell } from '../models/cell';
import ICellRepository from './i.cell.repository';
import IDbModel from './i.db.model';

class CellRepository implements ICellRepository {

    constructor() {
        this.dbModel =  new DbModel("sheetContents");
    }

    dbModel: IDbModel;

    async getAll(): Promise<Cell[]> {

        const cursor = this.dbModel.getAll();

        const cells:Cell[] = [];

        if (cursor !== undefined)
        {
            await cursor.forEach((e:unknown)=> {
                const cell: Cell = e as Cell
                cells.push(cell);
             });

             await cursor.close();
        }

        return cells;

    } 

    async  save(cell: Cell){
        await this.dbModel.save(cell, {column: cell.column, row: cell.row});
    } 

    async saveAll(data: Cell[]) {
        await this.dbModel.saveAll(data);
    } 
}

export default CellRepository;