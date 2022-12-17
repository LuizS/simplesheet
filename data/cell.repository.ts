import MongoRepository from './mongo/mongo.repository'
import { Cell } from '../models/cell'
import ICellRepository from './i.cell.repository'
import IRepository from './i.repository'

class CellRepository implements ICellRepository {
  constructor() {
    this.dbModel = new MongoRepository('sheetContents')
  }

  dbModel: IRepository<Cell>

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
