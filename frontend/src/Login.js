// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            // Simulação de autenticação
            const response = await axios.post('http://localhost:5000/api/login', { email, senha });
            if (response.data.success) {
                onLogin(); // Chama a função passada como prop para indicar que o login foi bem-sucedido
            } else {
                alert("Email ou senha incorretos.");
            }
        } catch (error) {
            alert("Erro ao fazer login.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control mb-3" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button className="btn btn-primary w-100" onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;