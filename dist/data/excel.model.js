"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const dbModel = (0, db_1.default)("sheetContents");
const excelModel = {
    getAll: dbModel.getAll,
    get: async function (row, column) {
        return dbModel.get({ row: row, column: column });
    },
    save: async function (object) {
        return dbModel.save(object);
    },
    saveAll: async function (data) {
        return dbModel.saveAll(data);
    }
};
exports.default = excelModel;
