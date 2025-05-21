import { json } from 'express';
import{conmysql} from '../bd.js'
export const obtenerProductos=(req,res)=>{
    res.send('Lista de Productos');
}
export const getProductos=async(req,res)=>{
try {
    const [result]= await conmysql.query(' select *from productos ')
    res.json({can:result.length, data:result})
} catch (error){
    return res.status(500).json({message: " error en el servidor "})
}
}

//Retorna producto por ID
export const getProductosporid=async(req,res)=>{
    try {
        //const miID=[req.params.id]
        const [result]= await conmysql.query(' select *from productos where prod_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message: "Producto no encontrado"
        })
        res.json(result[0])
    } catch (error){
        return res.status(500).json({message: " error en el servidor "})
    }
    }

    export const postProdu = async (req, res) =>{
        try {
            const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} =req.body
            const prod_imagen=req.file? `/uploads/${req.file.filename}`:nulll;
            //console.log("Datos del producto:", req.body);
            //console.log("Archivo imagen:", req.file);

            //validar que no se repta el codigo
            const [fila] = await conmysql.query('Select *from productos where prod_codigo=?',[prod_codigo])
            if (fila.length > 0) return res.status(404).json({id:0, message: 'Producto con codigo: '+prod_codigo+' ya esta registrado'})
            const [rows] = await conmysql.query(' INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES(?,?,?,?,?,?)', 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
        
            res.send({
            id: rows.insertId,
            message: 'Producto registrado con éxito'
        })
        } catch (error) {
            return res.status(500),json({message : error})
        }
    }

    /*
    //funcion para crear un nuevo producto
    export const postProductos=async(req,res)=>{
        try{
            const{prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES(?, ?, ?, ?, ?, ?) ', 
                [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
                res.send({
                    id:result.insertId
                })
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    } */

    //Funcion que permite modificar un productos
    export const putProductos=async(req,res)=>{
        try{
            const {id}=req.params 
            const{prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=? WHERE prod_id=? ', 
                [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"Producto no encontrado"
                });
                const[row] = await conmysql.query(' select * from productos where prod_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar una parte de la tabla
    export const patchProductos=async(req,res)=>{
        try{
            const {id}=req.params 
            const{prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE productos SET prod_codigo=IFNULL(?,prod_codigo), prod_nombre=IFNULL(?,prod_nombre, prod_stock=IFNULL(?,prod_stock, prod_precio=IFNULL(?,prod_precio), prod_activo=IFNULL(?,prod_activo), prod_imagen=IFNULL(?,prod_imagen) WHERE prod_id=? ', 
                [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"Producto no encontrado"
                });
                const[row] = await conmysql.query(' select * from productos where prod_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //funcion para eliminar
    export const deleteProductos=async(req,res)=>{
        try {
            //const miID=[req.params.id]
            const [result]= await conmysql.query(' delete from productos where prod_id=? ', [req.params.id])
            if(result.length<=0) return res.status(400).json({
                message: "Producto no encontrado"
            })
            res.status(204)
        } catch (error){
            return res.status(500).json({message: " error en el servidor "})
        }

    }