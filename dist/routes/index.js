"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', function (req, res, next) {
    res.render("index", { title: "Home", cssFiles: ["style.css"], jsFiles: [] });
});
module.exports = routes;
