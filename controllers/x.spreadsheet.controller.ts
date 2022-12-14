import XSpreadsheetViewModelConverter from '../viewmodel_converters/x.spreadsheet.viewmodel.converter';
import StandardController from './standard.controller';
import { Request, Response} from 'express';

class XSpreadsheetController extends StandardController {

    constructor() {
        super('x-spreadsheet','xspreadsheet',["xspreadsheet.css"],["xspreadsheet.js","de.js"], new XSpreadsheetViewModelConverter());     
    }

    override async saveAll(req: Request, res: Response){

        const data:object =  JSON.parse(req.body.sheetData) as object;
        await this.repository.saveAll(this.viewModelConverter.convertToModels(data));
        void res.redirect("/");

    }
}

export default XSpreadsheetController;