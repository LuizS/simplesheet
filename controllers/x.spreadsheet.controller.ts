import repository from '../data/cell.repository';
import { Cell } from '../models/cell';
import XSpreadsheetViewModelConverter from '../viewmodel_converters/x.spreadsheet.viewmodel.converter';
import StandardController from './standard.controller';

class XSpreadsheetController extends StandardController {

    constructor() {
        super('x-spreadsheet','xspreadsheet',["xspreadsheet.css"],["xspreadsheet.js","de.js"], new XSpreadsheetViewModelConverter());     
    }

}

export default XSpreadsheetController;