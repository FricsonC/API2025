import{Router} from 'express'
import multer from 'multer';

import { deleteProductosporid, getProductos, getProductosporid, patchProdu, postProdu, putProdu } from '../controladores/productosC.js'

//configurar multer para almacenar las imagenes
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads'); //carpeta donde se guardan las imagenes
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
    });

const uploads=multer({storage});

const router=Router();
//armar las rutas "URL"
router.get('/productos',getProductos)
router.get('/productos/:id', getProductosporid)
//router.post('/productos', uploads.single('prod_imagen'), postProductos)
router.post('/productos', uploads.single('prod_imagen'), postProdu)
router.put('/productos/:id', uploads.single('prod_imagen'),putProdu)
router.patch('/productos/:id',uploads.single('prod_imagen'), patchProdu)
router.delete('/productos/:id', deleteProductosporid)

export default router