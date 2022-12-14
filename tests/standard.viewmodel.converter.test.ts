import { Cell } from "../models/cell";
import StandardViewModelConverter from "../viewmodel_converters/standard.viewmodel.converter"

const viewModelConverter = new StandardViewModelConverter();
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

describe('testing standard view model converter',() => {
    describe('testing convert to view models', () => {
        test('empty input has an empty output', () => {
          const empty:Cell[]=[];
            expect((viewModelConverter.convertToViewModels(empty) as string[][]).length).toBe(0);
        });
        test('one cell convert to viewmodel', () => {
          const result = viewModelConverter.convertToViewModels([cell1]);
          expect(result).toStrictEqual([ [ 'First Cell' ] ]);
        }); 
        test('two cells with empty cells between convert to viewmodel', () => {
          const expectedResult:string[][] = [];
          expectedResult[0]=[];
          expectedResult[2]=[];
          expectedResult[0][0] = "First Cell";
          expectedResult[2][3] = "Second Cell";
          const result = viewModelConverter.convertToViewModels([cell1, cell2]);
          expect(result).toStrictEqual(expectedResult);
        });               
    })
    describe('testing convert to model', () => {
      test('empty input has an empty output', () => {
        expect(viewModelConverter.convertToModels([]).length).toBe(0);
      });

      test('viewmodel with on cell convert to one cell', () => {
        const expectedResult: Cell = {
          row: 0,
          column: 0,
          content: "Just One Cell"
        }
        const result = viewModelConverter.convertToModels([['Just One Cell']]);
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
            content: "The Second Cell"
          }];

        const input:string[][] = [];
        input[0]=[];
        input[2]=[];
        input[0][0] = "First Cell";
        input[2][3] = "The Second Cell";

        const result = viewModelConverter.convertToModels(input);
        expect( result).toStrictEqual(expectedResult);

      }); 
    })
})