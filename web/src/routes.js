import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteMaiorCompra from './pages/clienteMaiorCompra';

function RouteDom(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/ClienteMaiorCompra" element={< ClienteMaiorCompra />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteDom;