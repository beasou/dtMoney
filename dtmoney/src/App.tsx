import { Header } from "./components/Header"
import { GlobalStyle } from "./styles/global"
import { TransactionsTable } from "./components/TransactionsTable"
import { Dashboard } from "./components/Dashboard/intex"

export function App() {
  return (
    <>
      <Header/>
      <GlobalStyle />
      <Dashboard/>
    </>
  )
}

