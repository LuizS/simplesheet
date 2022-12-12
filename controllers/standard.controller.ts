import repository from '../data/cell.repository';
import { Cell } from '../models/cell';

abstract class StandardController {
    private componentName: string;
    private viewName: string;
    private cssFiles: string[];

    constructor(componentName:string, viewName:string, cssFiles:string[]) {
        this.componentName = componentName;
        this.viewName = viewName;
        this.cssFiles = cssFiles;
    }

    async saveChange(req: any, res: any){
    
        let cell: Cell = {
            row: req.body.row,
            column: req.body.column,
            content: req.body.content
        }

        console.log(cell);

        repository.save(cell);

        res.sendStatus(200);

    }

    async saveAll(req: any, res: any){

        var data = JSON.parse(req.body.sheetData);
        var result:Cell[] = [];
        console.log(data);
        for (var row=0;row<data.length;row++){
            for (var column=0;column<data[row].length;column++){
                result.push({
                    row: row,
                    column: column,
                    content: data[row][column]
                });
            }
        }
        console.log(result);

        await repository.saveAll(result);

        res.redirect("/");

    }

    async showExcel(res: any){

        var items = await repository.getAll();

        var mappedCells:string[][] = [];

        items.forEach(e => {
            mappedCells[e.row] = mappedCells[e.row] || [];
            mappedCells[e.row][e.column] =e.content;
         });
        
        res.render(this.viewName, {title:`${this.componentName} example`, cssFiles: this.cssFiles, Rows:mappedCells});

    }

}

export default StandardController;