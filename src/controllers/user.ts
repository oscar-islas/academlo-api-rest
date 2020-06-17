import {Request, Response} from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import {sendResetEmail} from './mail';

const getUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit);
    const documents = await User.countDocuments();
    //Para la primera página -> primeros dos usuarios
    //Page = 2 -> usuario 3 y 4
    //Page = 3 -> usuario 5 y 6
    //Page = 4 -> usuario 7 y 8
    // (1-1)*2 = 0 --> Primera página no estamos excluyendo a ningún usuario
    // (2-1)*2 = 2 --> Excluyendo los dos primeros usuarios [3, 4, 5, 6, 7] -> limit 2 [3, 4]
    // (3-1)*2 = 4 --> Excluyendo los primeros 4 usuarios [5, 6, 7] -> limit 2 [5, 6]
    // numeroRegistros/limite 7/2 = 3.5 -> 4
    // 7/3 = 2.3 -> 3 [1, 2, 3], [4, 5, 6], [7]
    // Math.ceil
    User.find().skip((page - 1) * limit).limit(limit).then( results => {
        res.json({
            totalResults: documents,
            limit: limit,
            page: page,
            totalPages: Math.ceil(documents/limit),
            hasPreviousPage: page > 1 ? true : false,
            hasNextPage: results.length >= limit ? true : false,
            prevPage: (page - 1) < 1 ? 1 : page-1,
            nextPage: page + 1,
            data: results
        });
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