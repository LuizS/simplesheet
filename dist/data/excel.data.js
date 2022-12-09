"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const mongodb_1 = require("mongodb");
const dbModel = (0, db_1.default)("sheetContents");
const excelData = {
    getAll: async () => {
        const cursor = dbModel.getAll();
        let cells = [];
        if (cursor !== undefined) {
            await cursor.forEach(e => {
                let cell = {
                    column: e.column,
                    row: e.row,
                    content: e.content
                };
                cells.push(cell);
            });
            // console.log(cells.length);
            cursor.close();
        }
        return cells;
    },
    get: async function (row, column) {
        return dbModel.get({ row: row, column: column });
    },
    save: async function (cell) {
        var item = await this.get(cell.row, cell.column);
        item = item || {
            row: cell.row,
            column: cell.column,
            _id: new mongodb_1.ObjectId()
        };
        item.content = cell.content;
        return dbModel.save(item);
    },
    saveAll: async function (data) {
        return dbModel.saveAll(data);
    }
};
exports.default = excelData;
