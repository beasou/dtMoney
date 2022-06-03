import Modal from 'react-modal'
import { useState } from 'react'
import { Header } from "./components/Header"
import { GlobalStyle } from "./styles/global"
import { Dashboard } from "./components/Dashboard/intex"
import { NewTransactionModal } from './components/NewTransactionModal'
import { TransactionsContext } from './TransactionsContext'

Modal.setAppElement('#root')//dentro de onde o modal vai se referenciar no caso na div root, mas o modal vai ficar no body

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsContext.Provider value={[]}>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <GlobalStyle />
      <Dashboard/>
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsContext.Provider>
  )
}

