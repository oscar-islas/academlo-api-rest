import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const signup = (req: Request, res: Response) => {
    let {name, password, email} = req.body;
    
    if(password && email){
        //Comprobar que el usuario no se encuentre registrado
        User.findOne({email: email}).then( user => {
            if(user){
                res.json({
                    message: "El usuario ya se encuentra registrado en el sistema"                    
                });
            }else{
                //Si no está registrado lo agregaremos en la BD
                bcrypt.hash(password, 10).then( hashPassword => {
                    const user = new User({
                        email: email,
                        password: hashPassword,
                        name: name,
                        cart: []
                    });
                    return user.save();
                }).then( result => {
                    const token = jwt.sign({result}, process.env.SECRET_KEY, {expiresIn: '1h'});
                    res.json({
                        message: "El usuario se ha registrado correctamente",
                        token: token
                    });
                }).catch( error => console.log(error));
            }
        });        
    }
}

export default {signup}