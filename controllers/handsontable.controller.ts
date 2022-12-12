import standardController from './standard.controller';

class HandsontableController extends standardController {

    constructor(){
        super("handsontable","handsontable",["handsontable.full.min.css"],["handsontable.full.min.js"]);
    }

    //script(src="javascripts/handsontable.full.min.js")
   /* script(src="https://cdn.jsdelivr.net/npm/hyperformula/chevrotain@6/lib/chevrotain.min.js")
    script(src="https://cdn.jsdelivr.net/npm/hyperformula/tiny-emitter@2/dist/tinyemitter.min.js")
    script(src="https://cdn.jsdelivr.net/npm/hyperformula/unorm@1/lib/unorm.js")
    script(src="https://cdn.jsdelivr.net/npm/hyperformula/dist/hyperformula.full.min.js")*/
 
}

export default HandsontableController;