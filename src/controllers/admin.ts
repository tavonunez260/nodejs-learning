import { Request, Response } from 'express';

import { Product } from 'models/products';

export const getAddProduct = (req: Request, res: Response) => {
	res.render('admin/add-edit-product', {
		path: '/admin/add-product',
		pageTitle: 'Add Product',
		editing: false
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
	const product = new Product(
		req.body.title,
		req.body.imageUrl,
		req.body.description,
		req.body.price
	);
	product.save();
	res.redirect('/');
};

export const getEditProduct = (req: Request, res: Response) => {
	const editMode = req.params.productId !== undefined;
	const productId = req.params.productId;
	Product.findById(productId, product =>
		res.render('admin/add-edit-product', {
			path: `/admin/edit-product/${req.params.productId}`,
			pageTitle: 'Edit Product',
			editing: editMode,
			product
		})
	);
};
