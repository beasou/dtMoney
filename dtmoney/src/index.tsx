import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import {App} from './App';
import { request } from 'http';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id:1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id:2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1000,
          createdAt: new Date('2021-02-12 09:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api' //rota da API em TransactionTable/index
    
    this.get('/transactions', () => {
          return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => { //rota de criação
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)//shema BD, 1º parametro qual que é o model que estou inserindo(transaction), 2º os dados q eu quero passar pra dentro do model
    })

  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

