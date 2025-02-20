import { Request, Response, NextFunction } from 'express';

import { Product } from 'models/products';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	});
};

export const getProducts = (req: Request, res: Response) => {
	Product.fetchAll(products => {
		res.render('shop', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true
		});
	});

};

export const postAddProduct = (req: Request, res: Response) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};
