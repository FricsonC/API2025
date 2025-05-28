import{Router} from 'express'
import { deleteClientesporid, getClientes, getClientesporid, patchClientes, postClientes, putClientes} from '../controladores/clientesC.js'
const router=Router();
//armar las rutas "URL"
router.get('/clientes',getClientes)
router.get('/clientes/:id', getClientesporid)
router.post('/clientes', postClientes)
router.put('/clientes/:id', putClientes)
router.patch('/clientes/:id',patchClientes)
router.delete('/clientes/:id', deleteClientesporid)

export default router