import { json } from 'express';
import{conmysql} from '../bd.js'
export const obtenerClientes=(req,res)=>{
    res.send('Lista de Clientes');
}
export const getClientes=async(req,res)=>{
try {
    const [result]= await conmysql.query(' select *from clientes where cli_estado= "A" ')
    res.json({can:result.length, data:result})
} catch (error){
    return res.status(500).json({message: " error en el servidor "})
}
}

//Retorna cliente por ID
export const getClientesporid=async(req,res)=>{
    try {
        //const miID=[req.params.id]
        const [result]= await conmysql.query(' select *from clientes where cli_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message: "Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error){
        return res.status(500).json({message: " error en el servidor "})
    }
    }

    export const postClientes=async(req,res)=>{
        try{
            const{cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
            const cli_estado= 'A'
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?) ', 
                [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado])
                res.send({
                    cli_id:result.insertId
                })
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar un cliente
    export const putClientes=async(req,res)=>{
        try{
            const {id}=req.params 
            const{cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE clientes SET cli_identificacion=? , cli_nombre=?, cli_telefono =?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad =? WHERE cli_id=? ', 
                [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"cliente eno encontrado"
                });
                const[row] = await conmysql.query(' select * from clientes where cli_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar una parte de la tabla
    export const patchClientes=async(req,res)=>{
        try{
            const {id}=req.params 
            const{cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE clientes SET cli_identificacion=IFNULL(?,cli_identificacion) , cli_nombre=IFNULL(?,cli_nombre), cli_telefono=IFNULL(?,cli_telefono), cli_correo=IFNULL(?,cli_correo), cli_direccion=IFNULL(?,cli_direccion), cli_pais=IFNULL(?,cli_pais), cli_ciudad=IFNULL(?,cli_ciudad), cli_estado=IFNULL(?, cli_estado) WHERE cli_id=? ', 
                [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado, id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"cliente eno encontrado"
                });
                const[row] = await conmysql.query(' select * from clientes where cli_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //funcion para eliminar
    export const deleteClientesporid=async(req,res)=>{
        try {
            //const miID=[req.params.id]
            const [result]= await conmysql.query(' delete from clientes where cli_id=? ', [req.params.id])
            if(result.length<=0) return res.status(400).json({
                message: "Cliente no encontrado"
            })
            res.status(204),json({message: "eliminado"})
        } catch (error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }