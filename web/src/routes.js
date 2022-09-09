import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteMaiorCompra from './pages/clienteMaiorCompra';
import Login from './pages/login';
import PrivateRoute from './privateRoute';

function RouteDom() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute>  < Home /> </PrivateRoute>} />
                <Route path="/login" element={< Login />} />
                <Route path="/ClienteMaiorCompra" element={<PrivateRoute> < ClienteMaiorCompra /> </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteDom;