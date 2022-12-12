import standardController from './standard.controller';

class HandsontableController extends standardController {

    constructor(){
        super("handsontable","handsontable",["handsontable.full.min.css"],["handsontable.full.min.js"]);
    }

}

export default HandsontableController;