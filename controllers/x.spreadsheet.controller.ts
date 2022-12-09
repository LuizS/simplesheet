import repository from '../data/cell.repository';
import { Cell } from '../models/cell';

const xSpreadsheetController = {

    saveChange : async function(req: any, res: any){
    
        let cell: Cell = {
            row: req.body.row,
            column: req.body.column,
            content: req.body.content
        }

        console.log(cell);

        repository.save(cell);

        res.sendStatus(200);

    },

    saveAll : async function(req: any, res: any){

        var data = JSON.parse(req.body.sheetData);
        var entries =Object.entries(data);
        var result:Cell[] = [];

        entries.filter((value:any, key: any) => {return value[1].cells!==undefined})
                                .forEach((value: any, row: any) => {
                                    var subentries =Object.entries(value[1].cells);
                                    return subentries.forEach((cell: any, key: any) => {
                                      // console.log(cell)
                                        result.push({
                                            row: row,
                                            column: cell[0],
                                            content: cell[1].text
                                        });
                                    });
                                });

        await repository.saveAll(result);
        res.sendStatus(200);

    },
    showExcel : async function(res: any){

        var items = await repository.getAll();
        var mappedCells:any = {};

        items.forEach(e => {
            mappedCells[e.row] = mappedCells[e.row] || {cells:{}};
            mappedCells[e.row].cells[e.column] = {text: e.content};
         });
        
        res.render('index', {title:"App", Rows: mappedCells});

    }

}

export default xSpreadsheetController;