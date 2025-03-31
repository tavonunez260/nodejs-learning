import { Router } from 'express';

import {
	getAddProduct,
	getAdminProducts,
	getEditProduct,
	postAddProduct,
	postEditProduct
} from 'controllers';

const router = Router();

router.get('/add-product', getAddProduct);
router.get('/products', getAdminProducts);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);

export { router as adminRoutes };
