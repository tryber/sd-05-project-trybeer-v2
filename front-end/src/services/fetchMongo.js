import axios from 'axios';
require('dotenv').config();

  const PORT = process.env.PORT || 3001;
  const API_URL = `http://localhost:${PORT}`

/*
Busca a lista de mensagens onde o email é o do cliente
Param: email
*/

export const getMessagesByClient = (email) => {
  const messages = axios
    .get(`${API_URL}/chat`, { email })
    .then((response) => response.data);
  return messages;
};
