"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const dbModel = (0, db_1.default)("sheetContents");
const cellRepository = {
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
    save: async (cell) => dbModel.save(cell, { column: cell.column, row: cell.row }),
    saveAll: async (data) => dbModel.saveAll(data)
};
exports.default = cellRepository;
