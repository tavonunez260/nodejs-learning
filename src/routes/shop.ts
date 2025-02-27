import { Router } from 'express';

import { getCart, getCheckout, getIndex, getOrders, getProducts } from 'controllers';

const router = Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);

export { router as shopRoutes };
