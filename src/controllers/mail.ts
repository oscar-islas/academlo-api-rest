import {Request, Response} from 'express';
import nodemailer, {TransportOptions} from 'nodemailer';

const sendMail = (req: Request, res: Response) => {
    let transporter: TransportOptions | null = nodemailer.createTransport({
        service: process.env.SERVICE_NAME,
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: process.env.USER,
            password: process.env.PASSWORD
        }
    });

    let options = {
        from: 'oislasre@gmail.com',
        to: 'oislasreyes@gmail.com',
        subject: 'Prueba de correo electronico con NodeMailer',
        text: 'Prueba de correo'
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
}

export default sendMail;