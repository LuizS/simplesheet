import CellRepository from '../data/cell.repository';
import ICellRepository from '../data/i.cell.repository';
import StandardViewModelConverter from '../viewmodel_converters/standard.viewmodel.converter';
import standardController from './standard.controller';

class HandsontableController extends standardController {

    constructor(viewModelConverter: StandardViewModelConverter = new StandardViewModelConverter(), repository: ICellRepository = new CellRepository()){
        super("handsontable","handsontable",["handsontable.full.min.css"],["handsontable.full.min.js"], viewModelConverter, repository);
    }

}

export default HandsontableController;