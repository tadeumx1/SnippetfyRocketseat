const { Category, Snippet } = require('../models');

module.exports = {

    async index(req, res) {

        try {

            const categories = await Category.findAll({

                // Aqui estamos trazendo todos os Snippets dessa categoria
                // podemos fazer isso por causa do relacionamento entre as tabelas

                include:[Snippet],
                
                where: { 

                    userId: req.session.user.id,

                },
        
            });

            return res.render('dashboard/index', { categories });

        } catch(err) {

            return next(err);

        }
    },

}