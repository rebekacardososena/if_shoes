// src/Cadastro.js
import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        try {
            await axios.post('http://localhost:5000/api/cadastro', { nome, email, senha });
            alert("Cliente cadastrado com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar cliente");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Cadastro</h2>
            <div className="card p-4 mt-4">
                <input type="text" className="form-control mb-3" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
                <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="form-control mb-3" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                <button className="btn btn-success w-100" onClick={handleCadastro}>Cadastrar</button>
            </div>
        </div>
    );
};

export default Cadastro;