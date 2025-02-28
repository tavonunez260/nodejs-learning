import { Router } from 'express';

import { getCart, getCheckout, getIndex, getOrders, getProduct, getProducts, postCart } from 'controllers';

const router = Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);

router.post('/cart/:productId', postCart);

export { router as shopRoutes };
