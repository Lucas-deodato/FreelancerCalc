const express = require('express');  // biblioteca que criará o servidor
const routes = express.Router();  // routes() criará as rotas para as páginas do site
const profileController = require('./controllers/ProfileController')
const jobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');
 
// fluxo request / response : aqui são criadas as rotas para as páginas do site
routes.get('/', DashboardController.index);
routes.get('/job', jobController.create);
// cria uma rota "post" para /job; é necessário habilitá-lar o recebimento da dados do body por meio no express
routes.post('/job', jobController.save);
routes.get('/job/:id', jobController.show);
routes.post('/job/:id', jobController.update);
routes.post('/job/delete/:id', jobController.delete);
routes.get('/profile', profileController.index);
routes.post('/profile', profileController.update);
// chama o objeto profile e o envia para profile.ejs

module.exports = routes; 