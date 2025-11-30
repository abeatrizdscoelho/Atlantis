import { Router } from 'express';
import {listAcomodacoes, getAcomodacao, createAcomodacao, updateAcomodacao, deleteAcomodacao
} from '../controllers/acomodacaoController';

const router = Router();

router.get('/', listAcomodacoes)
router.get('/:id', getAcomodacao)
router.post('/', createAcomodacao)
router.put('/:id', updateAcomodacao)
router.delete('/:id', deleteAcomodacao)

export default router;