import { Router } from 'express';
import { listClientes, getCliente, createCliente, updateCliente, toggleStatusCliente } 
from '../controllers/clienteController';

const router = Router();

router.get('/', listClientes)
router.get('/:id', getCliente)
router.post('/', createCliente)
router.put('/:id', updateCliente)
router.patch('/status/:id', toggleStatusCliente)

export default router;