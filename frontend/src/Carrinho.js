// src/Carrinho.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carrinho = ({ clienteId }) => {
    const [carrinhoItems, setCarrinhoItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCarrinho = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/carrinho/${clienteId}`);
                setCarrinhoItems(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error("Erro ao buscar itens do carrinho", error);
            }
        };

        fetchCarrinho();
    }, [clienteId]);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        setTotal(total.toFixed(2));
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/carrinho/${itemId}`);
            const updatedItems = carrinhoItems.filter(item => item.id !== itemId);
            setCarrinhoItems(updatedItems);
            calculateTotal(updatedItems);
            alert("Item removido do carrinho!");
        } catch (error) {
            alert("Erro ao remover item do carrinho: " + error.response.data);
        }
    };

    const increaseQuantity = async (item) => {
        try {
            await axios.put(`http://localhost:5000/api/carrinho/${item.id}`, { quantidade: item.quantidade + 1 });
            const updatedItems = carrinhoItems.map(i => i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i);
            setCarrinhoItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            alert("Erro ao aumentar quantidade: " + error.response.data);
        }
    };

    const decreaseQuantity = async (item) => {
        if (item.quantidade > 1) {
            try {
                await axios.put(`http://localhost:5000/api/carrinho/${item.id}`, { quantidade: item.quantidade - 1 });
                const updatedItems = carrinhoItems.map(i => i.id === item.id ? { ...i, quantidade: i.quantidade - 1 } : i);
                setCarrinhoItems(updatedItems);
                calculateTotal(updatedItems);
            } catch (error) {
                alert("Erro ao diminuir quantidade: " + error.response.data);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Carrinho de Compras</h2>
            {carrinhoItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {carrinhoItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {item.nome} - R${item.preco}
                                    <div className="btn-group btn-group-sm mt-2">
                                        <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(item)}>-</button>
                                        <span className="px-2">{item.quantidade}</span>
                                        <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(item)}>+</button>
                                    </div>
                                </div>
                                <div>
                                    R${(item.preco * item.quantidade).toFixed(2)}
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => removeFromCart(item.id)}>Remover</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h4>Total: R${total}</h4>
                </>
            )}
        </div>
    );
};

export default Carrinho;