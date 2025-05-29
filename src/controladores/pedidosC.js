import { json } from 'express';
import{conmysql} from '../bd.js'
export const obtenerPedidos=(req,res)=>{
    res.send('Lista de Pedidos');
}
export const getPedidos=async(req,res)=>{
try {
    const [result]= await conmysql.query(' select *from pedidos ')
    res.json({can:result.length, data:result})
} catch (error){
    return res.status(500).json({message: " error en el servidor "})
}
}

//Retorna cliente por ID
export const getPedidosporid=async(req,res)=>{
    try {
        //const miID=[req.params.id]
        const [result]= await conmysql.query(' select *from pedidos where cli_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message: "Pedido no encontrado"
        })
        res.json(result[0])
    } catch (error){
        return res.status(500).json({message: " error en el servidor "})
    }
    }

   export const postPedidos=async(req,res)=>{
        try{
            const{cli_id, usr_id, ped_fecha, ped_estado, productos}=req.body
            //console.log(req.body)
            //insertamos el pedidos
            const [pedidoResult]= await conmysql.query(
                ' INSERT INTO pedidos (cli_id, usr_id, ped_fecha, ped_estado) VALUES(?, ?, ?, ?) ', 
                [cli_id, usr_id, ped_fecha, ped_estado]);

                const pedidoId = pedidoResult.insertId;

                //insertamos los productos en la tabla detalle_pedido
                for (const producto of productos){
                    const { prod_id, det_cantidad, det_precio} = producto;
                    await conmysql.query(
                        'INSERT INTO detalle_pedidos (ped_id, prod_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)',
                        [pedidoId, prod_id, det_cantidad, det_precio]
                    );
                }
                
                res.status(201).json({ped_id: pedidoId, message: 'Pedido registrado con éxito' });
                
        }catch(error){
            console.error(error);
            return res.status(500).json({message: " Error al registrar el pedido "})
        }
    };

    //Funcion que permite modificar un cliente
    export const putPedidos=async(req,res)=>{
        try{
            const {id}=req.params 
            const{ped_fecha, ped_estado}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE pedidos SET ped_fecha=?, ped_estado=? WHERE cli_id=? ', 
                [ped_fecha, ped_estado,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"pedido no encontrado"
                });
                const[row] = await conmysql.query(' select * from pedidos where cli_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

     //Funcion que permite modificar una parte de la tabla
    export const patchPedidos=async(req,res)=>{
        try{
            const {id}=req.params 
            const{ped_fecha, ped_estado}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE pedidos SET ped_fecha=IFNULL(?,ped_fecha), ped_estado=IFNULL(?,ped_estado) WHERE cli_id=? ', 
                [ped_fecha, ped_estado,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"pedido no encontrado"
                });
                const[row] = await conmysql.query(' select * from pedidos where cli_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

     //funcion para eliminar
    export const deletePedidos=async(req,res)=>{
        try {
            //const miID=[req.params.id]
            const [result]= await conmysql.query(' delete from pedidos where cli_id=? ', [req.params.id])
            if(result.length<=0) return res.status(400).json({
                message: "Pedido no encontrado"
            })
            res.status(204)
        } catch (error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }
