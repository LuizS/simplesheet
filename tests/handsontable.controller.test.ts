import { Cell } from '../models/cell'
import HandsontableController from '../controllers/handsontable.controller'
import StandardViewModelConverter from '../viewmodel_converters/standard.viewmodel.converter'
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

describe('testing standard controller', () => {
  describe('testing save', () => {
    test('empty sheetData in body returns an 400 error', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: '',
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new HandsontableController(
        new StandardViewModelConverter(),
        fakeRepository,
      )
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(400)
    })
    test('empty body returns an 400 error', () => {
      const request = httpMock.createRequest({
        body: {},
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new HandsontableController(
        new StandardViewModelConverter(),
        fakeRepository,
      )
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
      const objectUnderTest = new HandsontableController(
        new StandardViewModelConverter(),
        fakeRepository,
      )
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
      const objectUnderTest = new HandsontableController(
        new StandardViewModelConverter(),
        fakeRepository,
      )
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(200)
      expect(fakeRepository.data).toStrictEqual([])
    })

    test('sheetData with one Cell should save one Cell', () => {
      const request = httpMock.createRequest({
        body: {
          sheetData: '[["FirstCell"]]',
        },
      })
      const response = httpMock.createResponse()
      const fakeRepository = new FakeRepository()
      const objectUnderTest = new HandsontableController(
        new StandardViewModelConverter(),
        fakeRepository,
      )
      void objectUnderTest.saveAll(request, response)
      expect(response._getStatusCode()).toBe(200)
      expect(fakeRepository.data[0].equals(new Cell(0, 0,'FirstCell'))).toBeTruthy
    })
  })
})
