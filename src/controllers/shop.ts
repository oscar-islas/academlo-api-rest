import {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

export const welcome = (req: Request, res: Response) => {
    res.json({
        message: "Hola Mundo"
    });
};

export const getProducts = (req: Request, res: Response) => {
    fs.readFile(path.join(__dirname, '..', 'products.json'), (error: Error | null, data: Buffer | string) => {
        if(!error){
            const products = JSON.parse(data.toString('utf-8'));
            res.status(200).json(products);
        }else{
            res.status(400).json({error: error, message: "No se pudo leer el archivo"});
        }
    });
};

export const postProduct = (req: Request, res: Response) => {
    fs.readFile(path.join(__dirname, '..', 'products.json'), (error: Error | null, data: Buffer | string) => {
        if(!error){
            const products = JSON.parse(data.toString('utf-8'));
            products.push(req.body);
            // const {name, description, price, category, imgUrl} = req.body;
            fs.writeFile(path.join(__dirname, '..', 'products.json'), JSON.stringify(products), (error: Error | null) => {
                if(error){
                    res.status(400).json({error: error, message: "No se pudo agregar el producto"});
                }
                res.status(200).json({message:"Se ha agregado el producto", products: req.body});
            })
            // res.status(200).json(products);
        }else{
            res.status(400).json({error: error, message: "No se pudo leer el archivo"});
        }
    });
}