import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';
import mongooseDriver from 'mongoose';
import env from 'dotenv';


const NODE_ENV = process.env.NODE_ENV; //Obteniendo el entorno de desarrollo 
env.config({ path: `.env.${NODE_ENV}`}); //Cargamos el archivo de variables de entorno 

const app = express();

//application/json
app.use(bodyParser.json());

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type: application/json');
    next();
});

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded()); 

app.use(authRoutes);
app.use('/admin', shopRoutes);


mongooseDriver.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-znugo.mongodb.net/ecommerce_db?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión con la base de datos establecida");
    app.listen(8080, () => { console.log("Escuchando sobre el puerto 8080"); });
}).catch(error => {
    console.log(error);
});