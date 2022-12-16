import { Cell } from '../models/cell'
import { CellViewModel } from '../viewmodels/cell.viewmodel'

export default class StandardViewModelConverter {
  convertToModel(row: number, column: number, content: string): Cell {
    const cell: Cell = {
      row: row,
      column: column,
      content: content,
    }

    return cell
  }

  convertToModels(data: CellViewModel[][] | unknown): Cell[] {
    const result: Cell[] = []

    if (Array.isArray(data)) {
      for (let row = 0; row < data.length; row++) {
        if (Array.isArray(data[row])) {
          const columns: string[] = data[row] as string[]
          for (let column = 0; column < columns.length; column++) {
            if (columns[column] !== undefined)
              result.push(this.convertToModel(row, column, columns[column]))
          }
        }
      }
    }

    return result
  }

  convertToViewModels(cells: Cell[]): string[][] | unknown {
    const viewModels: string[][] = []

    cells.forEach((e) => {
      viewModels[e.row] = viewModels[e.row] || []
      viewModels[e.row][e.column] = e.content
    })

    return viewModels
  }
}
