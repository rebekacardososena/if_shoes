// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Cadastro from './Cadastro';
import ProdutoList from './ProdutoList';
import Carrinho from './Carrinho';
import AdminPanel from './AdminPanel';
import Navbar from './NavBar'; // Importando o Navbar
import Footer from './Footer'; // Importando o Footer

const App = () => {
    const clienteId = 1; // Simulação de ID do cliente logado

    return (
        <Router>
            <Navbar /> {/* Adicionando o Navbar */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/produtos" element={<ProdutoList clienteId={clienteId} />} />
                <Route path="/carrinho" element={<Carrinho clienteId={clienteId} />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer /> {/* Adicionando o Footer */}
        </Router>
    );
};

export default App;