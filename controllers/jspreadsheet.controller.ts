import standardController from './standard.controller'

class JSpreadsheetController extends standardController {
  constructor() {
    super(
      'JSSpreadsheet',
      'jspreadsheet',
      ['jsuites.css', 'jexcel.css'],
      ['jexcel.js', 'jsuites.js'],
    )
  }
}

export default JSpreadsheetController
