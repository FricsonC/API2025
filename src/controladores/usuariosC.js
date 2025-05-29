import { json } from 'express';
import{conmysql} from '../bd.js'
export const obtenerUsuarios=(req,res)=>{
    res.send('Lista de Usiarios');
}
export const getUsuarios=async(req,res)=>{
try {
    const [result]= await conmysql.query(' select *from usuarios ')
    res.json({can:result.length, data:result})
} catch (error){
    console.log(error);
    return res.status(500).json({message: " error en el servidor "})
}
}

//Retorna cliente por ID
export const getUsuariosporid=async(req,res)=>{
    try {
        //const miID=[req.params.id]
        const [result]= await conmysql.query(' select *from usuarios where usr_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message: "Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error){
        return res.status(500).json({message: " error en el servidor "})
    }
    }

export const postUsuarios = async (req, res) => {
  try {
    const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo } = req.body;

    if (!usr_usuario || !usr_clave) {
      return res.status(400).json({ message: "usr_usuario y usr_clave son obligatorios" });
    }

    // Fuerza usr_activo = 1 siempre
    const usr_activo = 1;

    const [result] = await conmysql.query(
      'INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?, ?, ?, ?, ?, ?)',
      [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo]
    );
    res.send({ id: result.insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en el servidor" });
  }
};

    //Funcion que permite modificar un cliente
    export const putUsuarios=async(req,res)=>{
        try{
            const {id}=req.params 
            const{usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE usuarios SET usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? WHERE usr_id=? ', 
                [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"usuario eno encontrado"
                });
                const[row] = await conmysql.query(' select * from usuarios where usr_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //Funcion que permite modificar una parte de la tabla
    export const patchUsuarios=async(req,res)=>{
        try{
            const {id}=req.params 
            const{usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
            //console.log(req.body)
            const [result]= await conmysql.query(
                ' UPDATE usuarios SET usr_usuario=IFNULL(?,usr_usuario), usr_clave=IFNULL(?,usr_clave), usr_nombre=IFNULL(?,usr_nombre), usr_telefono=IFNULL(?,usr_telefono), usr_correo=IFNULL(?,usr_correo), usr_activo=IFNULL(?,usr_activo) WHERE usr_id=? ', 
                [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
                if(result.affectedRows<=0) return res.status(404).json({
                    message:"usuario eno encontrado"
                });
                const[row] = await conmysql.query(' select * from usuarios where usr_id=? ', [id]);
                res.json(row[0]);
        }catch(error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }

    //funcion para eliminar
    export const deleteUsuarios=async(req,res)=>{
        try {
            //const miID=[req.params.id]
            const [result]= await conmysql.query(' delete from usuarios where usr_id=? ', [req.params.id])
            if(result.length<=0) return res.status(400).json({
                message: "Usuario no encontrado"
            })
            res.status(204)
        } catch (error){
            return res.status(500).json({message: " error en el servidor "})
        }
    }
