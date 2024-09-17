// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

// Rotas para cadastro e login de cliente
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 8);
    
    db.query('INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword], (err, results) => {
        if (err) return res.status(500).send("Erro ao cadastrar o cliente.");
        res.status(200).send("Cliente cadastrado com sucesso!");
    });
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM clientes WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Cliente não encontrado.");

        const cliente = results[0];
        const passwordIsValid = bcrypt.compare(senha, cliente.senha);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: cliente.id }, 'segredo', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
});

// Rotas para gerenciar produtos e carrinho
// Adicione aqui as rotas para produtos e carrinho


// Rota para adicionar um item ao carrinho
app.post('/api/carrinho', (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body;

    db.query('INSERT INTO carrinho (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)', [cliente_id, produto_id, quantidade], (err, results) => {
        if (err) {
            console.error("Erro ao adicionar produto ao carrinho:", err);
            return res.status(500).send("Erro ao adicionar produto ao carrinho.");
        }
        res.status(200).send("Produto adicionado ao carrinho com sucesso!");
    });
});
// Rota para listar itens do carrinho
app.get('/api/carrinho/:cliente_id', (req, res) => {
    const { cliente_id } = req.params;

    db.query('SELECT c.quantidade, p.nome, p.preco FROM carrinho c JOIN produtos p ON c.produto_id = p.id WHERE c.cliente_id = ?', 
    [cliente_id], (err, results) => {
        if (err) return res.status(500).send("Erro ao buscar carrinho.");
        res.status(200).json(results);
    });
});
// Rota para atualizar a quantidade de um item no carrinho
app.put('/api/carrinho/:id', (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    db.query('UPDATE carrinho SET quantidade = ? WHERE id = ?', [quantidade, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar quantidade:", err);
            return res.status(500).send("Erro ao atualizar quantidade.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Item não encontrado no carrinho.");
        }
        res.status(200).send("Quantidade atualizada com sucesso!");
    });
});
// Rota para remover um item do carrinho
app.delete('/api/carrinho/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM carrinho WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error("Erro ao remover item:", err);
            return res.status(500).send("Erro ao remover o item do carrinho.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Item não encontrado no carrinho.");
        }
        res.status(200).send("Item removido do carrinho com sucesso!");
    });
});

// Rota para adicionar um produto
app.post('/api/produtos', (req, res) => {
    const { nome, preco, estoque, descricao } = req.body;
    
    db.query('INSERT INTO produtos (nome, preco, estoque, descricao) VALUES (?, ?, ?, ?)', 
    [nome, preco, estoque, descricao], (err, results) => {
        if (err) return res.status(500).send("Erro ao adicionar produto.");
        res.status(200).send("Produto adicionado com sucesso!");
    });
});

// Rota para listar todos os produtos
app.get('/api/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).send("Erro ao buscar produtos.");
        res.status(200).json(results);
    });
});

// Rota para editar um produto
app.put('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, estoque, descricao } = req.body;

    db.query('UPDATE produtos SET nome = ?, preco = ?, estoque = ?, descricao = ? WHERE id = ?', 
    [nome, preco, estoque, descricao, id], (err, results) => {
        if (err) return res.status(500).send("Erro ao editar produto.");
        res.status(200).send("Produto atualizado com sucesso!");
    });
});

// Rota para remover um produto
app.delete('/api/produtos/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao remover o produto.");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Produto não encontrado.");
        }
        res.status(200).send("Produto removido com sucesso!");
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});