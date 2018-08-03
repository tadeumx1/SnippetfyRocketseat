module.exports = {
  up: (queryInterface, DataTypes) => {
   
    queryInterface.createTable('Categories', {

      id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,

      },

      // Aqui estamos referenciando o Id do Usuário
      // que está nas tabelas usuários

      UserId: {

        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        // Isso vai atualizar o Id do usuário automaticamente
        // quando ele for alterado
        onUpdate: 'CASCADE',
        // Quando algum usuário for deletado e tiver categorias cadastradas
        // essas categorias também vão ser apagadas
        onDelete: 'CASCADE',
        // Não vai ter como criar uma categoria sem atribuir ela a um usuário
        // ou seja com um userId
        allowNull: false,

      },

      title: {

        allowNull: false,
        type: DataTypes.STRING,

      },

      createdAt: {

        allowNull: false,
        type: DataTypes.DATE,

      },

      updatedAt: {

        allowNull: false,
        type: DataTypes.DATE,

      }

    });

  },

  down: (queryInterface) => {
    
    queryInterface.dropTable('Categories');

  }
};
