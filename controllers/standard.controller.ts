import repository from '../data/cell.repository';
import StandardViewModelConverter from '../viewmodel_converters/standard.viewmodel.converter';

abstract class StandardController {

    protected componentName: string;
    protected viewName: string;
    protected cssFiles: string[];
    protected jsFiles: string[];
    protected viewModelConverter: StandardViewModelConverter;

    constructor(componentName:string, viewName:string, cssFiles:string[], jsFiles:string[], viewModelConverter: StandardViewModelConverter = new StandardViewModelConverter()) {

        this.componentName = componentName;
        this.viewName = viewName;
        this.cssFiles = cssFiles;
        this.jsFiles = jsFiles;
        this.viewModelConverter = viewModelConverter;

    }

    async saveChange(req: any, res: any){
    
        repository.save(this.viewModelConverter.convertToModel(req.body.row, req.body.column, req.body.content));
        res.sendStatus(200);

    }

    async saveAll(req: any, res: any){

        var data = JSON.parse(req.body.sheetData);
        await repository.saveAll(this.viewModelConverter.convertToModels(data));
        res.redirect("/");

    }

    async showExcel(res: any){

        var items = await repository.getAll();
        var mappedCells = this.viewModelConverter.convertToViewModels(items);
        res.render(this.viewName, {title:`${this.componentName} example`, cssFiles: this.cssFiles, jsFiles: this.jsFiles, Rows:mappedCells});

    }

}

export default StandardController;