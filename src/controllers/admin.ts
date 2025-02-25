import { Request, Response } from 'express';

import { Product } from 'models/products';

export const getAddProduct = (req: Request, res: Response) => {
	res.render('admin/add-product', {
		path: '/admin/add-product',
		pageTitle: 'Add Product'
	});
};

export const getAdminProducts = (req: Request, res: Response) => {
	Product.fetchAll(products => {
		res.render('admin/products', {
			path: '/admin/products',
			pageTitle: 'Admin Products',
			prods: products
		});
	});
};

export const postAddProduct = (req: Request, res: Response) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};
