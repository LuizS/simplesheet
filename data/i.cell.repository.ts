import { Cell } from '../models/cell'
import IRepository from './i.repository'

export default interface ICellRepository {
  dbModel: IRepository<Cell>
  getAll(): Promise<Cell[]>
  save(cell: Cell): Promise<void>
  saveAll(data: unknown[]): Promise<void>
}
