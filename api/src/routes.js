const express = require('express');
const route = express.Router();
const GraficoController = require('./controller/graficoController');
const LoginController = require('./controller/loginController');

const Login = new LoginController();
const Grafico = new GraficoController();

route.post('/login', Login.login);
route.get('/empresa', Login.listaEmpresa);

route.post('/clienteMaiorCompra', Grafico.clienteMaiorCompra);
route.post('/produtoMaiorSaida', Grafico.produtoMaiorSaida);
route.post('/vendasPorVendedor', Grafico.vendasPorVendedor);



module.exports = route;