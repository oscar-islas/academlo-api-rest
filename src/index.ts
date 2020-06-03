import express from 'express';
import bodyParser from 'body-parser';
import shopRoutes from './routes/shop';

const app = express();

//application/json
app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type: application/json');
    next();
});

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded()); 

app.use('/admin', shopRoutes);


app.listen(3000, () => { console.log("Escuchando sobre el puerto 8080"); });