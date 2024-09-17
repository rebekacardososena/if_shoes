// src/HomePage.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import imagem1 from './images/imagem1.jpg'; // Imagem 1
import imagem2 from './images/imagem2.jpg'; // Imagem 2
import imagem3 from './images/imagem3.jpg'; // Imagem 3
import imagem4 from './images/imagem4.jpg'; // Imagem 4
import imagem5 from './images/imagem5.jpg'; // Imagem 5
import imagem6 from './images/imagem6.jpg'; // Imagem 6
import imagem7 from './images/imagem7.jpg'; // Imagem 7
import imagem8 from './images/imagem8.jpg'; // Imagem 8
import imagem9 from './images/imagem9.jpg'; // Imagem 9

const HomePage = () => {
    return (
        <div>
            {/* Carrossel */}
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem1}
                        alt="Primeira imagem"
                    />
                    <Carousel.Caption>
                        <h3>Bem-vindo à IFShoes!</h3>
                        <p>Encontre os melhores sapatos para você.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem2}
                        alt="Segunda imagem"
                    />
                    <Carousel.Caption>
                        <h3>Novidades em Sapatos!</h3>
                        <p>Explore nossa nova coleção.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem3}
                        alt="Terceira imagem"
                    />
                    <Carousel.Caption>
                        <h3>Ofertas Imperdíveis!</h3>
                        <p>Aproveite descontos especiais.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem4}
                        alt="Quarta imagem"
                    />
                    <Carousel.Caption>
                        <h3>Conforto e Estilo</h3>
                        <p>Descubra a nova linha de tênis.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem5}
                        alt="Quinta imagem"
                    />
                    <Carousel.Caption>
                        <h3>Promoções Exclusivas!</h3>
                        <p>Não perca as ofertas do dia.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem6}
                        alt="Sexta imagem"
                    />
                    <Carousel.Caption>
                        <h3>Tênis para Todas as Ocasiões</h3>
                        <p>Encontre o par perfeito para você.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem7}
                        alt="Sétima imagem"
                    />
                    <Carousel.Caption>
                        <h3>Estilos Incríveis</h3>
                        <p>Aproveite nossas novas coleções.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem8}
                        alt="Oitava imagem"
                    />
                    <Carousel.Caption>
                        <h3>Sapatos para Todos os Gostos</h3>
                        <p>Explore nossa variedade de modelos.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={imagem9}
                        alt="Nona imagem"
                    />
                    <Carousel.Caption>
                        <h3>Aproveite Nossas Ofertas!</h3>
                        <p>Os melhores preços estão aqui.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Seção de Destaque */}
            <div className="bg-danger text-white text-center p-4 mt-4">
                <h2>NOVIDADES? TEMOS!</h2>
                <p>Encontre aqui as melhores marcas e modelos com o menor preço!</p>
            </div>

            {/* Cards de Produtos */}
            <div className="container mt-4">
                <div className="row">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={`https://via.placeholder.com/150?text=Produto+${item}`} alt={`Produto ${item}`} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Produto {item}</h5>
                                    <p className="card-text">Descrição do produto {item}.</p>
                                    <p className="card-text">Preço: R$199,99</p>
                                    <button className="btn btn-primary">Adicionar ao Carrinho</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;