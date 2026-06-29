const express = require("express")
const supaBase = require("../../config/supabase")

exports.getUsers = async(req,res) => {
    try {
        const {data, error} = await supaBase.from("usuarios").select("*")
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({msg:"error en el servidor"})
    }
}

exports.deleteUsers = async(req,res) => {
    const idUser = parseInt(req.params.id, 10)
    try {

        const {error} = await supaBase.from('usuarios').delete().eq('id', idUser)
        return res.status(200).json({msg:"Usuario eliminado exitosamente"})
    } catch (error) {
        console.error(error)
        return res.status(501).json({msg:'No existe ese usuario'})
    }
}

exports.updateUsers = async(req,res) => {
    const datos = req.body
    console.log()
    try {
        const {data, error} = await supaBase.from('usuarios').update({nombre:datos.nombre, rol:datos.rol,}).eq('id', datos.id)
        return res.status(200).json({msg:"Usuario actualizado con éxito"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg:"error con la petición a la base de datos"})
    }
}

exports.insertUsers = async(req,res) => {
    const datos = req.body
    try {
        const {data, error} = await supaBase.from('usuarios').insert({nombre:datos.nombre, rol:datos.rol})
        return res.status(200).json({msg:"usuario registrado con éxito"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg:"error con la petición a la base de datos"})
    }
}