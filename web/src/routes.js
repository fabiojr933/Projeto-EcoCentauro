import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import ClienteMaiorCompra from './pages/clienteMaiorCompra';
import ProdutoMaiorSaida from "./pages/produtoMaiorSaida";
import VendasPorVendedor from "./pages/vendasPorVendedor";
import ListaCentroCusto from "./pages/listaCentroCusto";
import Login from './pages/login';
import PrivateRoute from './privateRoute';

function RouteDom() {
    return (
        <BrowserRouter>
          <ToastContainer autoClose={4000} style={{ zIndex: 9999999 }} />
            <Routes>
                <Route path="/" element={<PrivateRoute>  < Home /> </PrivateRoute>} />
                <Route path="/login" element={< Login />} />
                <Route path="/ClienteMaiorCompra" element={<PrivateRoute> < ClienteMaiorCompra /> </PrivateRoute>} />
                <Route path="/ProdutoMaiorSaida" element={<PrivateRoute> < ProdutoMaiorSaida /> </PrivateRoute>} />
                <Route path="/VendasPorVendedor" element={<PrivateRoute> < VendasPorVendedor /> </PrivateRoute>} />
                <Route path="/ListaCentroCusto" element={<PrivateRoute> < ListaCentroCusto /> </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteDom;