import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import ClienteCreate from './pages/cliente/ClienteCreate'
import Clientes from './pages/cliente/ClienteList'
import Hospedagens from './pages/hospedagem/HospedagemList'
import HospedagemCreate from './pages/hospedagem/HospedagemCreate'
import ClienteRead from './pages/cliente/ClienteRead'
import ClienteUpdate from './pages/cliente/ClienteUpdate'
import Acomodacoes from './pages/acomodacao/AcomodacaoList'
import AcomodacaoUpdate from './pages/acomodacao/AcomodacaoUpdate'
import AcomodacaoCreate from './pages/acomodacao/AcomodacaoCreate'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/cliente/:id' element={<ClienteRead />} />
          <Route path='/cliente/create' element={<ClienteCreate />} />
          <Route path='/cliente/edit/:id' element={<ClienteUpdate />} />
          <Route path='/acomodacoes' element={<Acomodacoes />} />
          <Route path='/acomodacoes/:id' element={<AcomodacaoUpdate />} />
          <Route path='/acomodacoes/create' element={<AcomodacaoCreate />} />
          <Route path='/hospedagens' element={<Hospedagens />} />
          <Route path='/hospedagens/create' element={<HospedagemCreate />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </BrowserRouter>
  )
}