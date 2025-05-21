import express from 'express'
import cors from 'cors'

//para subir imagenes
import path from 'path'
import { fileURLToPath } from 'url'

//importar las rutas
import clientesRoutes from './routers/clientesR.js'
import pedidosRoutes from './routers/pedidosR.js'
import pedidos_detalleRoutes from './routers/pedidos_detalleR.js'
import usuariosRoutes from './routers/usuariosR.js'
import productosRoutes from './routers/productosR.js'

//definir los modulos de entrada
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//definir los permisos
const corsOptions={
    origin: '*', //la direccion del dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}


const app=express();

app.use(cors(corsOptions));
app.use(express.json()); //interpretar los objetos json
app.use(express.urlencoded({extended:true})) //se añade para aceptar formularios
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));

// indicar que rutas se utilizan
app.use('/api',clientesRoutes)
app.use('/api', pedidosRoutes)
app.use('/api', pedidos_detalleRoutes)
app.use('/api', usuariosRoutes)
app.use('/api',productosRoutes)



app.use((req,resp,next)=>{
    resp.status(400).json({
        message:'Endponit noy fount'
    })
})
export default app;


