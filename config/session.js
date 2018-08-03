const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Para buscar a conexão com o Banco de Dados que está no arquivo index da pasta Models
const { sequelize } = require('../app/models');

module.exports = {

    secret: 'snippetfy2018rocketseatgonode',
    resave: false,

    // Essa propriedade faz com que a conexão só seja iniciada
    // quando logarem na aplicação
    // Com a opção true ele já cria um registro quando o usuário entrar

    saveUninitialized: false,
    
    store: new SequelizeStore({

        db: sequelize,

    })

};