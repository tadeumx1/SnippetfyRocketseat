const hljs = require('highlight.js');

const md = require('markdown-it')({

    highlight: (str, lang) => {

        if (lang && hljs.getLanguage(lang)) {

            return `<pre class="hljs"><code>${hljs.highlight(lang, str.trim(), true).value}</code></pre>`

        }

        return `<pre class="hljs"><code>${md.utils.escapeHtml(str.trim())}</code></pre>`

    }

});

module.exports = (sequelize, DataTypes) => {

    const Snippet = sequelize.define('Snippet', {

        title: DataTypes.STRING,
        content: DataTypes.TEXT,

    }, {

        getterMethods: {

            excerpt() {

                // Esse código ele vai retornar do começo da String até o primeiro espaço que ele
                // encontrar depois de 120 caracteres

                return this.content.length > 120
                    ? `${this.content.substring(0, this.content.lastIndexOf(' ', 120))}...`
                    : this.content;

            },

            formattedContent() {

                return md.render(this.content);

            }

        }

    });

    Snippet.associate = (models) => {

        Snippet.belongsTo(models.Category);

    }

    return Snippet;
    
};