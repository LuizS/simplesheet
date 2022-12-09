import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Users' });
});
usersRouter.get('/andere', function(req, res, next) {
  res.render('index', { title: 'andere' });
});

module.exports = usersRouter;