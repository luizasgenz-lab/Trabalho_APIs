create database bd_dsapi;
use bd_dsapi;

create table cidades(
    id int primary key auto_increment,
    nome varchar(50) not null
);

create table categorias(
    id int primary key auto_increment,
    nome varchar(100) not null
);

create table clientes(
    id int primary key auto_increment,
    nome varchar(100) not null,
    altura double, 
    nascimento date,
    cidade_id int not null,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id) 
);

create table produtos(
    id int primary key auto_increment,
    nome varchar(100) not null,
    preco double,
    quantidade double, 
    categoria_id int not null,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)  
);

create table pedidos(
    id int primary key auto_increment,
    horario datetime not null,
    endereco varchar(200),
    cliente_id int not null,
    FOREIGN KEY  (cliente_id) REFERENCES clientes(id)
);

create table pedidos_produtos(
    pedido_id int,
    produto_id int,
    preco double, 
    quantidade double, 
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

