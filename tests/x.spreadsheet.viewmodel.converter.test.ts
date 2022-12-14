import { Cell } from "../models/cell";
import XSpreadsheetCell from "../models/x.spreadsheet.cell";
import XSpreadsheetRow from "../models/x.spreadsheet.row";
import XSpreadsheetViewModelConverter from "../viewmodel_converters/x.spreadsheet.viewmodel.converter"

const viewModelConverter = new XSpreadsheetViewModelConverter();
const cell1: Cell = {
  row: 0,
  column: 0,
  content: "First Cell"
}
const cell2: Cell = {
  row: 2,
  column: 3,
  content: "Second Cell"
}


describe('testing XSpreadSheetViewModelConverter',() => {
    describe('testing convert to view models', () => {
        test('empty input has an empty output', () => {
            expect(viewModelConverter.convertToViewModels([])).toStrictEqual({});
        });
      
        test('one cell convert to viewmodel', () => {
          const result = viewModelConverter.convertToViewModels([cell1]);
          expect(result).toStrictEqual({'0': { 'cells':{ 0: {text: 'First Cell'}}}});
        }); 
     
        test('two cells with empty cells between them converted to viewmodel', () => {
          const result = viewModelConverter.convertToViewModels([cell1, cell2]);
          expect(result).toStrictEqual({'0': { 
                                                'cells':{ 
                                                            0: {text: 'First Cell'}
                                                        }
                                              },
                                         '2': { 
                                            'cells':{ 
                                                        3: {text: 'Second Cell'}
                                                    }
                                                }
                                        });
        });             
    })
   
    describe('testing convert to model', () => {
      test('empty input has an empty output', () => {
        expect(viewModelConverter.convertToModels({}).length).toBe(0);
      });

      test('viewmodel with on cell convert to one cell', () => {
        const expectedResult: Cell = {
          row: 0,
          column: 0,
          content: "Just One Cell"
        }
        const input: XSpreadsheetRow = { 'cells': { 0: {text: 'Just One Cell'} as XSpreadsheetCell  } }
        const result = viewModelConverter.convertToModels({'0': input});
        expect(result).toStrictEqual([expectedResult]);
      }); 

      test('viewmodel with two cells convert to two cells', () => {

        const expectedResult:Cell[] = [{
            row: 0,
            column: 0,
            content: "First Cell"
          },{
            row: 2,
            column: 3,
            content: "Second Cell"
          }];

        const input = {'0': { 
                            'cells':{ 
                                        0: {text: 'First Cell'}
                                    }
                        },
                        '2': { 
                        'cells':{ 
                                    3: {text: 'Second Cell'}
                                }
                            }
                    };

        const result = viewModelConverter.convertToModels(input);
        expect( result).toStrictEqual(expectedResult);

      }); 
     
      test('viewmodel with two cells and the len property set converted to two cells and the len property is ignorated', () => {

        const expectedResult:Cell[] = [{
            row: 0,
            column: 0,
            content: "First Cell"
          },{
            row: 2,
            column: 3,
            content: "Second Cell"
          }];

        const input = {'0': { 
                            'cells':{ 
                                        0: {text: 'First Cell'}
                                    }
                        },
                        '2': { 
                        'cells':{ 
                                    3: {text: 'Second Cell'}
                                }
                            },
                            'len': 2
                    };

        const result = viewModelConverter.convertToModels(input);
        expect( result).toStrictEqual(expectedResult);

      }); 
    })
})