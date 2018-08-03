module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {

        title: DataTypes.STRING

    });

    // Estamos fazendo essa associação para o model reconhecer o campo UserId
    // que está na tabela de Usuários e a relação de categoria e usuários

    Category.associate = (models) => {

        // A categoria pertence ao usuário
        Category.belongsTo(models.User);

        // Uma categoria pode ter varios snippets
        Category.hasMany(models.Snippet);

    }

    return Category;
    
};