import DbModel from './db.model'
import { Cell } from '../models/cell'
import ICellRepository from './i.cell.repository'
import IDbModel from './i.db.model'

class CellRepository implements ICellRepository {
  constructor() {
    this.dbModel = new DbModel('sheetContents')
  }

  dbModel: IDbModel<Cell>

  async getAll(): Promise<Cell[]> {
    return this.dbModel.getAll()
  } 

  async save(cell: Cell) {
    await this.dbModel.save(cell, { column: cell.column, row: cell.row })
  }

  async saveAll(data: Cell[]) {
    await this.dbModel.saveAll(data)
  }
}

export default CellRepository
