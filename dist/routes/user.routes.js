"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Users' });
});
usersRouter.get('/andere', function (req, res, next) {
    res.render('index', { title: 'andere' });
});
module.exports = usersRouter;
