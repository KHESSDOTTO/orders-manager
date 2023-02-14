// O objetivo deste código é criar uma instância do Axios com uma URL base específica para o ambiente de desenvolvimento ou produção,
// dependendo do valor da variável de ambiente process.env.NODE_ENV. Além disso, ele também adiciona um interceptador de solicitação para
// adicionar um cabeçalho de autorização às solicitações feitas através dessa instância do Axios.
import axios from "axios";

// Aqui, estamos criando um objeto chamado apiURLs que contém duas propriedades: development e production. Cada propriedade contém uma URL base diferente para a API.
const apiURLs = {
  // development: "http://localhost:1337/api", KHESS: estou trocando temporariamente para somente a URL de production para rodar
  // na minha máquina local durante o desenvolvimento
  development: "https://ordermanagerdb.onrender.com/api",
  production: "https://ordermanagerdb.onrender.com/api",
};

// Aqui, estamos criando uma instância do Axios com a URL base especificada para o ambiente atual, que é determinado pela variável de ambiente process.env.NODE_ENV.
//  O valor desse objeto será a propriedade correspondente do objeto apiURLs, que contém a URL base para o ambiente de desenvolvimento ou produção.
const api = axios.create({
  baseURL: apiURLs[process.env.NODE_ENV],
});

// Aqui, estamos adicionando um interceptador de solicitação à instância do Axios. Esse interceptador será executado antes de cada solicitação feita através da instância do Axios.
//  Ele adiciona um cabeçalho de autorização à solicitação, que inclui um token de acesso (um longo valor string).

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer f7e8b66a3f23af7cfcc08667ea79b91c97e36bcbd3d94ff55d914641f218d9fd6a90f99c733e7c954712b4c3e918b885418235d84485f90a0a227567567497a8469d08b2eb3d47f6f57cb2f10c6368de2c6b8db5a52d5ce2ed12dffcd1448859ffbd2976f621691d6347598b5f343f5d93f5bb55e59054f84315734e70b360e3`,
  };

  return config;
});

export { api };
