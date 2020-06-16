import {body} from 'express-validator';

export const signupValidator = () => {
    return  [
        body('email', 'Ingresa un correo valido').isEmail(), 
        body('name', 'Ingresa un nombre de al menos 3 caracteres de longitud').isLength({min: 3, max: 8}),
        body('password', 'Ingresa una contraseña de al menos 8 caracteres que contenga letras y al menos un número').isAlphanumeric().isLength({min: 8}),
        body('rpassword').custom((value, {req}) => {
            if(value === req.body.password){
                return true;
            }else{
                throw new Error('Las contraseñas no coinciden');
            }
        })
    ]
}