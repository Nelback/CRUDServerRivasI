

const express = require("express")
const supaBase = require("../../config/supabase")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const path = require("node:path")
require("dotenv").config()

const secretKey = process.env.SECRET_KEY

/** @type {express.RequestHandler} */

exports.loginUser = async(req,res) => {
        const dato = req.body
        
    try {
    const {data, error} = await supaBase.from("Users").select("*")

    const findUser = data.find(u => u.Usuario === dato.usuario)
        if(findUser) {
            if (findUser.password === dato.pass){
                const payload = findUser
                const token = jwt.sign(payload, secretKey, {expiresIn:"1h"})
                res.cookie('Login_token', token, {
                    httpOnly:true,
                    secure:true,
                    maxAge:86400000,
                })
                return res.status(200).json({msg:"Usuario logueado"})
            }else {
                return res.status(401).json({msg:"contraseña incorrecta"})
            }
        } else {
            return res.status(402).json({msg:"usuario no encontrado"})
        }
    } catch (error) {
        console.error(error)
    }
}


exports.validateUser = (req,res) =>{
    const token = req.cookies.Login_token

    if(!token) {
        return res.status(401).json({msg:"no se ha encontrado ningún token"})
        console.log("no se ha encontrado token")
    }

    try {
        const payloadVerfiy = jwt.verify(token, secretKey)
        return res.status(200).json({usuario:payloadVerfiy.Usuario})

    } catch (error) {
        console.error("no es valida la cookie")
        return res.status(401)
    }
}

exports.logout = (req,res) => {
    
    try {
    res.clearCookie('Login_token', {path:'/'})
    return res.status(200).json({msg:'Sesion cerrada exitosamente'})  
    } catch (error) {
        console.error(error)
    }
}
