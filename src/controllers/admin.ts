import { Request, Response } from 'express';

import { Product } from 'models/products';

export const getAddProduct = (req: Request, res: Response) => {
	res.render('admin/add-edit-product', {
		path: '/admin/add-product',
		pageTitle: 'Add Product',
		editing: false
	});
};

export const getAdminProducts = async (req: Request, res: Response) => {
	const [rows] = await Product.fetchAll();
	res.render('admin/products', {
		path: '/admin/products',
		pageTitle: 'Admin Products',
		prods: rows
	});
};

export const postAddProduct = async (req: Request, res: Response) => {
	const product = new Product(
		req.body.title,
		req.body.image_url,
		req.body.description,
		parseInt(req.body.price)
	);
	await product.save();
	res.redirect('/admin/products');
};

export const getEditProduct = async (req: Request, res: Response) => {
	const editMode = req.params.productId !== undefined;
	const productId = req.params.productId;
	const [products] = await Product.findById(productId);
	res.render('admin/add-edit-product', {
		path: `/admin/edit-product/${req.params.productId}`,
		pageTitle: 'Edit Product',
		editing: editMode,
		products: products[0]
	});
};

export const postEditProduct = async (req: Request, res: Response) => {
	const product = new Product(
		req.body.title,
		req.body.image_url,
		req.body.description,
		req.body.price,
		req.body.id
	);
	await product.save();
	res.redirect('/admin/products');
};

export const postDeleteProduct = (req: Request, res: Response) => {
	const { id } = req.body;
	Product.deleteById(id);
	res.redirect('/admin/products');
};
