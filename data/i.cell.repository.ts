import { Cell } from "../models/cell";
import IDbModel from "./i.db.model";

export default interface ICellRepository {
    dbModel:IDbModel;
    getAll() : unknown ;
    save (cell: Cell) : Promise<void>;
    saveAll(data: unknown[] ) : Promise<void>;
}