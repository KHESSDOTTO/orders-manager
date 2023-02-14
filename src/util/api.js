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
    Authorization: `Bearer 264403769ce6fe341f9e61d55ebb5a798248cf92a89d1aba7ba38920bdfb9674551e721f689f811629196913e56054ed47e5749ff4b56990dd59f260e4a80032a0ba2a1880a08f22fcb372292094d1a6edd730092b446e9b91377ad422fd367f90542e5d4462d332d0cde27dba3d89fe43809f69d1812432fff8d1983c3ad6ea`,
  };

  return config;
});

export { api };
