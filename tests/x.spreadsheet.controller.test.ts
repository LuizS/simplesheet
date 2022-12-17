import { Cell } from '../models/cell'
import XSpreadsheetController from '../controllers/x.spreadsheet.controller'
import httpMock from 'node-mocks-http'
import ICellRepository from '../data/i.cell.repository'
import iDbModel from '../data/i.repository'

class FakeRepository implements ICellRepository {
  dbModel!: iDbModel

  data: any
  getAll(): Promise<Cell[]> {
    return new Promise<Cell[]>(() => void {})
  }

  save(cell: Cell) {
    return new Promise<void>(() => void {})
  }

  saveAll(data: Cell[]) {
    this.data = data
    return new Promise<void>(() => void {})
  }
}

describe('testing XSpreadsheet controller', () => {
  describe('testing save', () => {
    test('empty sheetData in body returns an 400 error', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: '',
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new XSpreadsheetController(fakeRepository)
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(400)
    })
    test('empty body returns an 400 error', () => {
      const request = httpMock.createRequest({
        body: {},
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new XSpreadsheetController(fakeRepository)
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(400)
    })
    test('invalid sheetData content in body returns an 400 error', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: 'some invalid content',
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new XSpreadsheetController(fakeRepository)
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(400)
    })
    test('sheetData with empty content should clear collection', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: '[]',
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new XSpreadsheetController(fakeRepository)
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(200)
      expect(fakeRepository.data).toStrictEqual([])
    })

    test('sheetData with one Cell should save one Cell', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: `{"0": {"cells":{"0": {"text": "First Cell"}}}}`,
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new XSpreadsheetController(fakeRepository)
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(200)
      expect(fakeRepository.data[0].key()).toStrictEqual(
         new Cell(0, 0, 'First Cell' ).key()
      )
      expect(fakeRepository.data[0].content).toStrictEqual(
        new Cell(0, 0, 'First Cell' ).content
     )
    })
  })
})
