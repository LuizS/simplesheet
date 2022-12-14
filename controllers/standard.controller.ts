import ICellRepository from '../data/i.cell.repository';
import CellRepository from '../data/cell.repository';
import StandardViewModelConverter from '../viewmodel_converters/standard.viewmodel.converter';
import { Request, Response} from 'express';
import { SheetDataViewModel } from '../viewmodels/sheet.data.viewmodel';
import { CellViewModel } from '../viewmodels/cell.viewmodel';
import { Cell } from '../models/cell';

abstract class StandardController {

    protected componentName: string;
    protected viewName: string;
    protected cssFiles: string[];
    protected jsFiles: string[];
    protected viewModelConverter: StandardViewModelConverter;
    protected repository:ICellRepository;

    constructor(componentName:string, viewName:string, cssFiles:string[], jsFiles:string[], viewModelConverter: StandardViewModelConverter = new StandardViewModelConverter(), repository: ICellRepository = new CellRepository()) {

        this.componentName = componentName;
        this.viewName = viewName;
        this.cssFiles = cssFiles;
        this.jsFiles = jsFiles;
        this.viewModelConverter = viewModelConverter;
        this.repository = repository;

    }

    async saveChange(req: Request, res: Response){
    
        const cellViewModel:CellViewModel = req.body as CellViewModel;
        await this.repository.save(this.viewModelConverter.convertToModel(cellViewModel.row, cellViewModel.column, cellViewModel.content));
        res.sendStatus(200);

    }

    async saveAll(req: Request, res: Response){

        const sheetData = req.body.sheetData as string;

        if (sheetData == null || sheetData == "")
        {
            void res.sendStatus(400);
            return;
        }

        try{
            const data = JSON.parse(sheetData) as SheetDataViewModel;
            await this.repository.saveAll(this.viewModelConverter.convertToModels(data));
            void res.redirect("/");
        } catch(e)
        {
            const error:Error=e as Error;
            // handle JSON Parsing errors
            if (error.name=="SyntaxError"){
                void res.sendStatus(400);
                return;
            }    
            throw error;
        }

    }

    async showExcel(res: Response){

        const items = await this.repository.getAll() as Cell[];
        const mappedCells = this.viewModelConverter.convertToViewModels(items);
        res.render(this.viewName, {title:`${this.componentName} example`, cssFiles: this.cssFiles, jsFiles: this.jsFiles, Rows:mappedCells});

    }

}

export default StandardController;