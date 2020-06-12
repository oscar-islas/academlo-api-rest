import {Request, Response} from 'express';
import nodemailer, {TransportOptions} from 'nodemailer';

export const sendMail = (req: Request, res: Response) => {
    let {nombre, email, asunto, mensaje} = req.body;
    if(nombre && email && asunto && mensaje){
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE_NAME,
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
    
        let options = {
            from: 'oislasre@gmail.com',
            to: email,
            subject: asunto,
            text: 'Prueba de correo',
            html: `<h1>${nombre}</h1><p>${mensaje}</p>`
        }
    
        transporter.sendMail(options, (error: Error, info: any) => {
            if(error){
                res.json({
                    message: "Hubo un error al enviar el correo",
                    error: error.message
                });
            }else{
                res.status(200).json({
                    message: "El correo se ha enviado satisfactoriamente"
                });
            }
        });
    }else{
        res.status(400).json({
            message: "Hay campos vacios"
        });
    }
}

export const sendResetEmail = (req: Request, res: Response, newPassword: string) => {
    let {email} = req.body;
    if(email){
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE_NAME,
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
    
        let options = {
            from: 'oislasre@gmail.com',
            to: email,
            subject: 'Restablecer contraseña',
            text: 'Prueba de correo',
            html: `<h1>Esta sería tu nueva contraseña</h1><p>${newPassword}</p>`
        }
    
        transporter.sendMail(options, (error: Error, info: any) => {
            if(error){
                res.json({
                    message: "Hubo un error al enviar el correo",
                    error: error.message
                });
            }else{
                res.status(200).json({
                    message: "El correo se ha enviado satisfactoriamente"
                });
            }
        });
    }else{
        res.status(400).json({
            message: "Hay campos vacios"
        });
    }
}