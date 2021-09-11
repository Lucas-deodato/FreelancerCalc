const express = require('express')
const server = express()
const routes = require("./routes")  // o require() se liga com o arquivo routes, que está no mesmo diretório
const path = require("path")  // módulo para alterar caminhos de arquivos

server.set('view engine', 'ejs')  // set o EJS como template engine da página

// Mudar a localização da pasta views; o projeto passa a entender que por padrão tds os ejs estão em /src/views
server.set('views', path.join(__dirname, 'views'))

// use() é usado para habilitar/atualizar configurações no servidor
// informa ao express que ele deve criar rotas para os arquivos statics que estão na pasta public(o express espera que estejam lá)
server.use(express.static("public"))

// usar a requisição do body (req.body)
server.use(express.urlencoded({ extended: true }))  // habilita a requisição do body 
// é aqui que o servidor recebe os dados do frontend - em forma de objeto, conforme descrito nos campos "name" do form.

// routes
server.use(routes) 

server.listen(3000, () => console.log('Rodando'))  
// listen() fica ouvindo o servidor, os dois argumentos são: a porta e o que fará o quando ouvi a porta