import {Request, Response} from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import {sendResetEmail} from './mail';

const getUsers = (req: Request, res: Response) => {
    User.find().then( results => {
        res.json(results);
    });
}

const resetPassword = async (req: Request, res: Response) => {
    let email: string = req.body.email;
    let longitud: number = 8;
    let newPassword: string = randPassword(longitud);
    try{
        let hash = await bcrypt.hash(newPassword, 10);
        let user = await User.find({email: email});
        console.log(user);
        if(user.length > 0){
            //Existe un usuario con el correo electronico proporcionado por el cliente
            //Cambiar la contraseña
            let response = await User.updateOne({email: email}, {password: hash});
            //Enviar correo electrónico
            sendResetEmail(req, res, newPassword);

            // res.json({
            //     nuevaContrasena: hash
            // });
        }else{
            res.json({
                message: "No existe el usuario en el sistema"
            })
        }        
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: "Hubo un error al tratar de restablecer tu contraseña"
        });
    }
    
    
}

const randPassword = (passLength: number):string => {
    let newPassword: string = '';
    let characters = "abcdefghijklmnopqrstuvwzABCDEFGHIJKLMNOPQRSTUVWZ1234567890";
    for(let i=0; i<passLength; i++){
        newPassword += characters[(Math.floor(Math.random() * characters.length))];
    }
    return newPassword;
}

export default {
    getUsers,
    resetPassword
}