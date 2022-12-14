import XSpreadsheetCell from "./x.spreadsheet.cell"

    export default interface XSpreadsheetRow {
            cells:{
                [key: number]:XSpreadsheetCell
            }
    }