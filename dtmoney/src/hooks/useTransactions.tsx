import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction{
    id: number,
    title: string,
    amount:number,
    type: string,
    category:string,
    createdAt: string
}

// interface TransactionInput {
//     title: string,
//     amount:number,
//     type: string,
//     category:string,
// }

//type TransactionInput = Pick<Transaction, 'o que eu quero, ao invé do q n quero'>

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> // vai herdar os campos de Transaction menos o id e o data

interface TransactionsProviderProps{
    children: ReactNode,
}

interface TransactionsContextData {
    transactions: Transaction[] //um array de transaction
    createTransaction: (transaction: TransactionInput) => Promise<void> //uma função que vai receber uma transaction do tipo input e vai devolver um void
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //"engana" forçando uma tipagem no type Script 
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    useEffect(()=>{
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    },[])

    async function createTransaction(transactionInput: TransactionInput){
       const response = await api.post('/transactions', {
           ...transactionInput,
           createdAt: new Date(),
        }) //chamada da API
        
       const {transaction} = response.data
       setTransactions([
           ...transactions, //pego os transactions existentes
           transaction, //formo um novo array
       ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children} 
        </TransactionsContext.Provider>
    )
}//value={{transactions, createTransaction}} => mando um obs com transactions e a função que qro usar em

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context
}