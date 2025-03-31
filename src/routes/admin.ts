import { Router } from 'express';

import { getAddProduct, getAdminProducts, getEditProduct, postAddProduct } from 'controllers';

const router = Router();

router.get('/add-product', getAddProduct);
router.get('/products', getAdminProducts);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

export { router as adminRoutes };
