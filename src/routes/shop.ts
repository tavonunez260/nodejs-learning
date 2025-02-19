import { Router } from 'express';

import { products } from 'controllers';

const router = Router();

router.get('/', (req, res) => {
	res.render('shop', {
		prods: products,
		pageTitle: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	});
});

export { router as shopRoutes };
