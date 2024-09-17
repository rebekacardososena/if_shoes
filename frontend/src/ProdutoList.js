// src/ProdutoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdutoList = ({ clienteId }) => {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [precoMinimo, setPrecoMinimo] = useState('');
    const [precoMaximo, setPrecoMaximo] = useState('');
    const [corSelecionada, setCorSelecionada] = useState('');

    // Cores disponíveis para filtragem
    const coresDisponiveis = ['Vermelho', 'Azul', 'Verde', 'Preto', 'Branco'];

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            }
        };
        
        fetchProdutos();
    }, []);

    const addToCart = async (produtoId) => {
        try {
            await axios.post('http://localhost:5000/api/carrinho', { cliente_id: clienteId, produto_id: produtoId, quantidade: 1 });
            alert("Produto adicionado ao carrinho!");
        } catch (error) {
            alert("Erro ao adicionar produto ao carrinho");
        }
    };

    // Função para filtrar produtos
    const filterProducts = () => {
        return produtos.filter(produto => {
            const dentroDoPreco =
                (precoMinimo === '' || produto.preco >= precoMinimo) &&
                (precoMaximo === '' || produto.preco <= precoMaximo);
            
            const correspondeCor = corSelecionada === '' || produto.cor === corSelecionada;

            return (
                produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
                dentroDoPreco &&
                correspondeCor
            );
        });
    };

    const filteredProdutos = filterProducts();

    return (
        <div className="container mt-5">
            <h2 className="text-center">Lista de Produtos</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Preço Mínimo"
                            value={precoMinimo}
                            onChange={(e) => setPrecoMinimo(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Preço Máximo"
                            value={precoMaximo}
                            onChange={(e) => setPrecoMaximo(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select mb-3"
                            value={corSelecionada}
                            onChange={(e) => setCorSelecionada(e.target.value)}
                        >
                            <option value="">Selecione a Cor</option>
                            {coresDisponiveis.map(cor => (
                                <option key={cor} value={cor}>{cor}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Botão de Busca */}
                <button className="btn btn-primary" onClick={() => filterProducts()}>Buscar</button>
            </div>

            <div className="row">
                {filteredProdutos.length > 0 ? (
                    filteredProdutos.map(produto => (
                        <div key={produto.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={`https://via.placeholder.com/150`} alt={produto.nome} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{produto.nome}</h5>
                                    <p className="card-text">Preço: R${produto.preco}</p>
                                    <p className="card-text">Cor: {produto.cor}</p>
                                    <button className="btn btn-primary" onClick={() => addToCart(produto.id)}>Adicionar ao Carrinho</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto encontrado com os critérios selecionados.</p>
                )}
            </div>
        </div>
    );
};

export default ProdutoList;