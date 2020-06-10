import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import mongooseDriver from 'mongoose';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import auth from './middleware/auth';

const NODE_ENV = process.env.NODE_ENV; //Obteniendo el entorno de desarrollo 
env.config({ path: `.env.${NODE_ENV}`}); //Cargamos el archivo de variables de entorno 

const app = express();
const csurfProtection = csurf({cookie: true}); //Token CSRF -> Cross-site Request Forgery 

//application/json
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.use(csurfProtection);

app.get('/csrf', (req, res) => {
    res.json({
        csrfToken: req.csrfToken()
    })
});

app.use((req, res, next) => {
    console.log(req.cookies.token);
    next();
});

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded()); 
app.use(authRoutes);
app.use(userRoutes);
app.use('/admin', auth, shopRoutes);


mongooseDriver.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-znugo.mongodb.net/ecommerce_db?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión con la base de datos establecida");
    app.listen(8080, () => { console.log("Escuchando sobre el puerto 8080"); });
}).catch(error => {
    console.log(error);
});