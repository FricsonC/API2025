import { json } from 'express';
import{conmysql} from '../bd.js'
export const obtenerpedidos_detalle=(req,res)=>{
    res.send('Lista de pedidos detalle');
}
export const getPedidos_detalle=async(req,res)=>{
try {
    const [result]= await conmysql.query(' select *from pedidos_detalle ')
    res.json({can:result.length, data:result})
} catch (error){
    return res.status(500).json({message: " error en el servidor "})
}
}

//Retorna cliente por ID
export const getPedidos_detalleporid=async(req,res)=>{
    try {
        //const miID=[req.params.id]
        const [result]= await conmysql.query(' select *from pedidos_detalle where det_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message: "Detalle del pedido no encontrado"
        })
        res.json(result[0])
    } catch (error){
        return res.status(500).json({message: " error en el servidor "})
    }
    }

    export const postPedidos_detalle=async(req,res)=>{
        try{
            const{det_cantidad, det_precio}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' INSERT INTO pedidos_detalle(det_cantidad, det_precio) VALUES(?, ?) ', 
                [det_cantidad, det_precio])
                res.send({
                    id:result.insertId
                })
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar un cliente
    export const putPedidos_detalle=async(req,res)=>{
        try{
            const {id}=req.params 
            const{det_cantidad, det_precio}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE pedidos_detalle SET det_cantidad=?, det_precio=? WHERE det_id=? ', 
                [det_cantidad, det_precio,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"Detalle del pedido no encontrado"
                });
                const[row] = await conmysql.query(' select * from pedidos_detalle where det_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar una parte de la tabla
    export const patchPedidos_detalle=async(req,res)=>{
        try{
            const {id}=req.params 
            const{det_cantidad, det_precio}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE pedidos_detalle SET det_cantidad=IFNULL(?, det_cantidad), det_precio=IFNULL(?,det_precio) WHERE det_id=? ', 
                [det_cantidad, det_precio,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"Detalle del pedido no encontrado"
                });
                const[row] = await conmysql.query(' select * from pedidos_detalle where det_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //funcion para eliminar
    export const deletePedidos_detalle=async(req,res)=>{
        try {
            //const miID=[req.params.id]
            const [result]= await conmysql.query(' delete from pedidos_detalle where det_id=? ', [req.params.id])
            if(result.length<=0) return res.status(400).json({
                message: "Detalle del producto no encontrado"
            })
            res.status(204)
        } catch (error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }