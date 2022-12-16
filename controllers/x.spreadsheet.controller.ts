import XSpreadsheetViewModelConverter from '../viewmodel_converters/x.spreadsheet.viewmodel.converter';
import StandardController from './standard.controller';
import { Request, Response} from 'express';
import ICellRepository from '../data/i.cell.repository';
import CellRepository from '../data/cell.repository';

class XSpreadsheetController extends StandardController {

    constructor(repository: ICellRepository = new CellRepository) {
        super('x-spreadsheet','xspreadsheet',["xspreadsheet.css"],["xspreadsheet.js","de.js"], new XSpreadsheetViewModelConverter(), repository);     
    }

    override async saveAll(req: Request, res: Response){
        const sheetData = req.body.sheetData as string;

        if (sheetData == null || sheetData == "")
        {
            res.sendStatus(400);
            return;
        }
        try{
            const data:object =  JSON.parse(req.body.sheetData) as object;
            await this.repository.saveAll(this.viewModelConverter.convertToModels(data));
            res.redirect("/");
        } catch(e)
        {
            const error:Error=e as Error;
            // handle JSON Parsing errors
            if (error.name=="SyntaxError"){
                res.sendStatus(400);
                return;
            }    
            throw error;
        }
    }
}

export default XSpreadsheetController;