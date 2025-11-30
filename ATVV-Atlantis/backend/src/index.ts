import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoute';
import acomodacaoRoutes from './routes/acomodacaoRoute';
import dotenv from 'dotenv';
import hospedagemRoutes from './routes/hospedagemRoute';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/hospedagens', hospedagemRoutes);
app.use('/api/acomodacoes', acomodacaoRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`)
})