import{Router} from 'express'
import { deletePedidos_detalle, getPedidos_detalle, getPedidos_detalleporid, patchPedidos_detalle, postPedidos_detalle, putPedidos_detalle } from '../controladores/pedidos_detalleC.js'
const router=Router();
//armar las rutas "URL"
router.get('/pedidos_detalle', getPedidos_detalle)
router.get('/pedidos_detalle/:id', getPedidos_detalleporid)
router.post('/pedidos_detalle', postPedidos_detalle)
router.put('/pedidos_detalle/:id', putPedidos_detalle)
router.patch('/pedidos_detalle/:id', patchPedidos_detalle)
router.delete('/pedidos_detalle/:id', deletePedidos_detalle)

export default router