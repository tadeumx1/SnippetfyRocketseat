module.exports = {
  up: (queryInterface, DataTypes) => {

    queryInterface.createTable('Snippets', {

      id: {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,

      },

      // Aqui estamos referenciando o Id do Usuário
      // que está nas tabelas usuários

      CategoryId: {

        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' },
        // Isso vai atualizar o Id da categoria automaticamente
        // quando ela for alterada
        onUpdate: 'CASCADE',
        // Quando alguma categoria for deletada e tiver snippets cadastrados
        // esses snippets também vão ser apagados
        onDelete: 'CASCADE',
        // Não vai ter como criar um snippet sem atribuir ele a uma categoria
        // ou seja com um CategoryId
        allowNull: false,

      },

      title: {

        allowNull: false,
        type: DataTypes.STRING,

      },

      content: {

        allowNull: false,
        type: DataTypes.TEXT,

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

  down: (queryInterface, DataTypes) => {
   
    queryInterface.dropTable('Snippets');
    
  }
};
