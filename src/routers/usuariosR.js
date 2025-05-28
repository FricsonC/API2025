import{Router} from 'express'
import { deleteUsuarios, getUsuarios, getUsuariosporid, patchUsuarios, postUsuarios, putUsuarios } from '../controladores/usuariosC.js'

//import { verificarToken } from '../middlewares/verificarToken.js';

const router=Router();
//armar las rutas "URL"

//router.get('/usuarios',verificarToken, getUsuarios)
router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuariosporid)
//router.post('/usuarios',verificarToken, postUsuarios)
router.post('/usuarios', postUsuarios)
router.put('/usuarios/:id', putUsuarios)
router.patch('/usuarios/:id', patchUsuarios)
router.delete('/usuarios/:id', deleteUsuarios)

export default router