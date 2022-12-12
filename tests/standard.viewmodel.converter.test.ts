import { Cell } from "../models/cell";
import StandardViewModelConverter from "../viewmodel_converters/standard.viewmodel.converter"

var viewModelConverter = new StandardViewModelConverter();
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

describe('testing standard view model converter',() => {
    describe('testing convert to view models', () => {
        test('empty input has an empty output', () => {
            expect(viewModelConverter.convertToViewModels([]).length).toBe(0);
        });
        test('one cell convert to viewmodel', () => {
          var result = viewModelConverter.convertToViewModels([cell1]);
          expect(result).toStrictEqual([ [ 'First Cell' ] ]);
        }); 
        test('two cells with empty cells between convert to viewmodel', () => {
          var expectedResult:string[][] = [];
          expectedResult[0]=[];
          expectedResult[2]=[];
          expectedResult[0][0] = "First Cell";
          expectedResult[2][3] = "Second Cell";
          var result = viewModelConverter.convertToViewModels([cell1, cell2]);
          expect(result).toStrictEqual(expectedResult);
        });               
    })
    describe('testing convert to model', () => {
      test('empty input has an empty output', () => {
        expect(viewModelConverter.convertToModels([]).length).toBe(0);
      });

      test('viewmodel with on cell convert to one cell', () => {
        let expectedResult: Cell = {
          row: 0,
          column: 0,
          content: "Just One Cell"
        }
        var result = viewModelConverter.convertToModels([['Just One Cell']]);
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
            content: "The Second Cell"
          }];

        var input:string[][] = [];
        input[0]=[];
        input[2]=[];
        input[0][0] = "First Cell";
        input[2][3] = "The Second Cell";

        var result = viewModelConverter.convertToModels(input);
        expect( result).toStrictEqual(expectedResult);

      }); 
    })
})