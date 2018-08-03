const express = require('express');

const routes = express.Router();

const authMiddleware = require ('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const categoryController = require('./controllers/categoryController');
const snippetController = require('./controllers/snippetController');

// Criando um Middleware que vai ser executado em todas as textAlignLast: 

routes.use((req, res, next) => {

    // O res.locals é um objeto com as variáveis passadas para as nossas views
    // Quando passamos algumas variáveis para as views pelo render elas são
    // adicionados ao objeto res.locals
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');

    // Chamando o próximo Middleware a ser executado

    next();

});

/**
 * Auth
 */

routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */

routes.use('/app', authMiddleware);

routes.get('/app/dashboard', dashboardController.index);

/**
 * Categoria
 */

routes.get('/app/categories/:id', categoryController.show)
routes.post('/app/categories/create', categoryController.store);

 /**
  * Snippet
  */
 
routes.get('/app/categories/:categoryId/snippets/:id', snippetController.show);
routes.post('/app/categories/:categoryId/snippets/create', snippetController.store);
routes.put('/app/categories/:categoryId/snippets/:id', snippetController.update);
routes.delete('/app/categories/:categoryId/snippets/:id', snippetController.destroy);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {

    res.status(err.status || 500);

    return res.render('errors/index', {

        message: err.message,
        error: process.env.NODE_ENV === 'production' ? {} : err,

    });

});

// O GET geralmente serve para a gente buscar alguma informação
// seja da base de dados ou do servidor

// O POST serve para quando a gente está criando novas
// informações geralmente um formulário 
// que cadastra alguma coisa e cria alguma coisa no banco de dados

// O PUT ele é utilizado para quando a gente tá editando alguma informação
// por exemplo quando a gente tiver a edição de um Snippet vamos utilizar

// O DELETE serve para quando temos que excluir alguma coisa

// GET, POST, PUT, DELETE

module.exports = routes;