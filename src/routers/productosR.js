import{Router} from 'express'
import multer from 'multer';

import { deleteProductos, getProductos, getProductosporid, patchProductos, postProdu, putProductos } from '../controladores/productosC.js'

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
router.put('/productos/:id', putProductos)
router.patch('/productos/:id',patchProductos)
router.delete('/productos/:id', deleteProductos)

export default router