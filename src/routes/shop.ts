import { Router } from 'express';

import { getCart, getCheckout, getIndex, getProducts } from 'controllers';

const router = Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);

export { router as shopRoutes };
