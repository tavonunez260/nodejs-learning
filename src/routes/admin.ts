import { Router } from 'express';

import { getAddProduct, getAdminProducts, postAddProduct } from 'controllers';

const router = Router();

router.get('/add-product', getAddProduct);
router.get('/products', getAdminProducts);

router.post('/add-product', postAddProduct);

export { router as adminRoutes };
