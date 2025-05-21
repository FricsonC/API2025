import{Router} from 'express'
import { deletePedidos, getPedidos, getPedidosporid, patchPedidos, postPedidos, putPedidos } from '../controladores/pedidosC.js'
const router=Router();
//armar las rutas "URL"
router.get('/pedidos', getPedidos)
router.get('/pedidos/:id', getPedidosporid)
router.post('/pedidos', postPedidos)
router.put('/pedidos/:id', putPedidos)
router.patch('/pedidos/:id', patchPedidos)
router.delete('/pedidos/:id', deletePedidos)

export default router