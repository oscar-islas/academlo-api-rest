import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';
import Product from '../models/products';

export const welcome = (req: Request, res: Response) => {
    res.json({
        message: "Hola Mundo"
    });
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    let products = [];
    const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit);
    const documents = await Product.countDocuments();
    const totalPages = Math.ceil(documents/limit);
    //1 -> Ascendente
    //-1 -> Descendente
    Product.find().skip((page - 1) * limit).limit(limit).sort({price: 1}).then( results => {
        products = results;        
        res.json({
            totalResults: documents,
            limit: limit,
            page: page,
            totalPages: totalPages,
            hasPreviousPage: page > 1 ? true : false,
            hasNextPage: results.length >= limit ? true : false,
            prevPage: (page - 1) < 1 ? 1 : page-1,
            nextPage: (page + 1) >= totalPages ? totalPages : page + 1,            
            data: products
        });
    }).catch(error => {
        console.log(error);
        error.message = "Hubo un error al obtener los productos";
        error.code = 400;
        next(error);
    });
};

export const postProduct = (req: Request, res: Response, next: NextFunction) => {
    const newProduct = new Product({...req.body});
    newProduct.save().then(() => {
        console.log("Se ha agregado el producto correctamente")
        res.json({
            message: "Se ha agregado el producto correctamente",
            product: newProduct 
        });
    }).catch( error => {
        console.log(error);
        error.message = "Hubo un error al tratar de agregar el producto en el sistema";
        error.code = 400;
        next(error);
    });
}

export const putProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {...req.body}).then( product => {
        res.json({
            message:"Se ha actualizado el producto correctamente",
            product: product
        })
    }).catch(error => console.log(error));
}

export const deleteProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id).then(product => {
        console.log(product);
        res.json({
            message: "El producto se ha eliminado correctamente",
            product: product
        })
    }).catch(error => console.log(error));
}