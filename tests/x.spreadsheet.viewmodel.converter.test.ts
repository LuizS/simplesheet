import { Cell } from "../models/cell";
import XSpreadsheetViewModelConverter from "../viewmodel_converters/x.spreadsheet.viewmodel.converter"

var viewModelConverter = new XSpreadsheetViewModelConverter();
let cell1: Cell = {
  row: 0,
  column: 0,
  content: "First Cell"
}
let cell2: Cell = {
  row: 2,
  column: 3,
  content: "Second Cell"
}


describe('testing XStreadSheetViewModelConverter',() => {
    describe('testing convert to view models', () => {
        test('empty input has an empty output', () => {
            expect(viewModelConverter.convertToViewModels([])).toStrictEqual({});
        });
      
        test('one cell convert to viewmodel', () => {
          var result = viewModelConverter.convertToViewModels([cell1]);
          expect(result).toStrictEqual({'0': { 'cells':{ 0: {text: 'First Cell'}}}});
        }); 
     
        test('two cells with empty cells between them converted to viewmodel', () => {
          var result = viewModelConverter.convertToViewModels([cell1, cell2]);
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
        let expectedResult: Cell = {
          row: 0,
          column: 0,
          content: "Just One Cell"
        }
        var result = viewModelConverter.convertToModels({'0': { 'cells':{ 0: {text: 'Just One Cell'}}}});
        expect(result).toStrictEqual([expectedResult]);
      }); 

      test('viewmodel with two cells convert to two cells', () => {

        var expectedResult:Cell[] = [{
            row: 0,
            column: 0,
            content: "First Cell"
          },{
            row: 2,
            column: 3,
            content: "Second Cell"
          }];

        var input = {'0': { 
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

        var result = viewModelConverter.convertToModels(input);
        expect( result).toStrictEqual(expectedResult);

      }); 
     
    })
})