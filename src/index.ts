import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import shopRoutes from './routes/shop';
import mongooseDriver from 'mongoose';

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

app.use('/admin', shopRoutes);

mongooseDriver.connect('mongodb+srv://oislasreyes:sp0ugXGWboofWwAh@cluster0-znugo.mongodb.net/ecommerce_db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión con la base de datos establecida");
    app.listen(8080, () => { console.log("Escuchando sobre el puerto 8080"); });
}).catch(error => {
    console.log(error);
});