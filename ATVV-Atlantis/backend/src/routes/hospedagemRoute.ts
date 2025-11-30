import { Router } from 'express';
import { createHospedagem, deleteHospedagem, getHospedagem, listHospedagens, updateHospedagem, checkInHospedagem, checkOutHospedagem } from '../controllers/hospedagemController';

const router = Router();

router.get('/', listHospedagens)
router.get('/:id', getHospedagem)
router.post('/', createHospedagem)
router.put('/:id', updateHospedagem)
router.delete('/:id', deleteHospedagem)
router.patch('/:id/checkin', checkInHospedagem) 
router.patch('/:id/checkout', checkOutHospedagem)

export default router;