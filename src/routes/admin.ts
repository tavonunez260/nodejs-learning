import { Router } from 'express';

import { getAddProduct, postAddProduct } from 'controllers';

const router = Router();

router.get('/add-product', getAddProduct);
router.post('/add-product', postAddProduct);

export { router as adminRoutes };
