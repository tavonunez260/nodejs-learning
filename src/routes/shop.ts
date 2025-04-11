import { Router } from 'express';

import {
	getCart,
	getCheckout,
	getIndex,
	getOrders,
	getProduct,
	getProducts,
	postCart,
	postDeleteCart
} from 'controllers';

const router = Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);

router.post('/cart/:productId', postCart);
router.post('/cart-delete', postDeleteCart);

export { router as shopRoutes };
