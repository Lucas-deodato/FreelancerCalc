// ponte que une o código com o banco de dados

const sqlite3 = require('sqlite3');
const { open } = require('sqlite')  // importando apenas o método "open" do módulo sqlite

// por default, o open deve estar dentro de uma estrutura de função, e não de objeto, por isso a necessidade da arrow
module.exports = () => open({  // arrow function com 1 item não precisa por chaves
    filename: './database.sqlite', // arquivo onde o banco salvará as informações
    driver: sqlite3.Database  // o drive irá trabalhar(processar) os arquivos e enviá-los para serem salvos no filename
})
 

// ao chamar este arquivo(config.js) em outros, automaticamente já será possível usar o banco de dados