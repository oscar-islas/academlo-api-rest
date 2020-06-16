import express from 'express';
import authController from '../controllers/auth';
import jwt from 'jsonwebtoken';
import {check} from 'express-validator';

const router = express.Router();

router.post('/signup', [
    check('email', 'Ingresa un correo valido').isEmail(), 
    check('name', 'Ingresa un nombre de al menos 3 caracteres de longitud').isLength({min: 3, max: 8}),
    check('password', 'Ingresa una contraseña de al menos 8 caracteres que contenga letras y al menos un número').isAlphanumeric().isLength({min: 8}),
    check('rpassword').custom((value, {req}) => {
        if(value === req.body.password){
            return true;
        }else{
            throw new Error('Las contraseñas no coinciden');
        }
    })
], authController.signup);

router.post('/login', authController.login);

router.post('/verify', (req, res) => {
    const token = req.body.token;
    
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(!error){
            res.json({
                message: "Token validado correctamente",
                decoded: decoded
            });
        }else{
            res.status(401).json({
                message: "Token incorrecto"
    
            });
        }
        
    });
});

export default router;