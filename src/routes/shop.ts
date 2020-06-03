import express from 'express';
// import shopController from '../controllers/shop';
import {welcome, getProducts, postProduct} from '../controllers/shop';
const router = express.Router();

router.get('/', welcome);

router.get('/products', getProducts);

router.post('/products', postProduct);

export default router;