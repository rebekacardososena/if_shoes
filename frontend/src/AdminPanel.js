// src/AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

    // Cores disponíveis para seleção
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

    const handleAddProduct = async () => {
        try {
            await axios.post('http://localhost:5000/api/produtos', { 
                nome, 
                preco: parseFloat(preco), 
                estoque: parseInt(estoque), 
                descricao,
                cor 
            });
            alert("Produto adicionado com sucesso!");
            window.location.reload();
        } catch (error) {
            alert("Erro ao adicionar produto");
        }
    };

    const handleRemoveProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/produtos/${id}`);
            alert("Produto removido com sucesso!");
            window.location.reload();
        } catch (error) {
            alert("Erro ao remover produto");
        }
    };

    // Função para abrir o modal de edição
    const openEditModal = (produto) => {
        setProdutoEditando(produto);
        setNome(produto.nome);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
        setDescricao(produto.descricao);
        setCor(produto.cor);
        setIsModalOpen(true); // Abrindo o modal
    };

    // Função para atualizar o produto
    const handleUpdateProduct = async () => {
        try {
            await axios.put(`http://localhost:5000/api/produtos/${produtoEditando.id}`, { 
                nome,
                preco: parseFloat(preco),
                estoque: parseInt(estoque),
                descricao,
                cor 
            });
            alert("Produto atualizado com sucesso!");
            setIsModalOpen(false); // Fechar o modal
            window.location.reload(); // Recarregar a lista de produtos
        } catch (error) {
            alert("Erro ao atualizar produto");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Painel de Administrador</h2>

            <h3>Adicionar Produto</h3>
            <input type="text" className="form-control mb-3" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
            <input type="number" className="form-control mb-3" placeholder="Preço" onChange={(e) => setPreco(e.target.value)} />
            <input type="number" className="form-control mb-3" placeholder="Estoque" onChange={(e) => setEstoque(e.target.value)} />
            <textarea className="form-control mb-3" placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />
            
            {/* Campo para selecionar a cor */}
            <select className="form-select mb-3" value={cor} onChange={(e) => setCor(e.target.value)}>
                <option value="">Selecione a Cor</option>
                {coresDisponiveis.map(corOp => (
                    <option key={corOp} value={corOp}>{corOp}</option>
                ))}
            </select>

            <button className="btn btn-success w-100 mb-4" onClick={handleAddProduct}>Adicionar Produto</button>

            <h3>Lista de Produtos</h3>
            <ul className="list-group">
                {produtos.map(produto => (
                    <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {produto.nome} - Cor: {produto.cor} - Preço: R${produto.preco}
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(produto)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(produto.id)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal para Editar Produto */}
            {isModalOpen && (
                <div className="modal fade show d-block" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden={!isModalOpen}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Produto</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="number" className="form-control mb-3" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                                <input type="number" className="form-control mb-3" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                                <textarea className="form-control mb-3" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                
                                {/* Campo para selecionar a cor */}
                                <select className="form-select mb-3" value={cor} onChange={(e) => setCor(e.target.value)}>
                                    {coresDisponiveis.map(corOp => (
                                        <option key={corOp} value={corOp}>{corOp}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Fechar</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;