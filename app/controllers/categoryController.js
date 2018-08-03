const { Category, Snippet } = require('../models');

module.exports = {

    // Esse método vai criar a categoria, o certo seria
    // um método chamado createCategory mas para usar esse nome
    // seria melhor criar uma rota para isso mas não
    // vamos fazer isso pois estamos usando um modal

    async store(req, res, next) {

        try {

            const category = await Category.create({

                // Pegando as informações do formulário

                ...req.body, 
                UserId: req.session.user.id,

            });

            req.flash('success', 'Categoria criada com sucesso');

            return res.redirect(`/app/categories/${category.id}`);

        } catch (err) {

            return next(err);

        }

    },

    // Utilizamos o show para mostrar o detalhe de algum Model

    async show(req, res, next) {

        try {

            const categories = await Category.findAll({

                // Aqui estamos trazendo todos os Snippets dessa categoria
                // podemos fazer isso por causa do relacionamento entre as tabelas

                include:[Snippet],
            
                where: { 

                    userId: req.session.user.id,

                },
    
            });

            const snippets = await Snippet.findAll({

                where: { CategoryId: req.params.id },

            });

            return res.render('categories/show', { 
                
                categories, 
                snippets,
                activeCategory: req.params.id,
            
            });

        } catch (err) {

            return next(err);

        }

    }

};