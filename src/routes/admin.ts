import { Router } from 'express';

const router = Router();

const products: { title: string }[] = [];

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	});
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
	const { title } = req.body;
	products.push({ title });
	res.redirect('/');
});

export { router as adminRoutes, products };
