import { Request, Response } from 'express';

import { Product } from 'models/products';

export const getProducts = (req: Request, res: Response) => {
	Product.fetchAll(products => {
		res.render('shop/product-list', {
			path: '/products ',
			pageTitle: 'All Products',
			prods: products
		});
	});
};

export const getProduct = (req: Request, res: Response) => {
	const productId = req.params.productId;
	Product.findById(productId, product => {
		res.render('shop/product-detail', {
			path: `/products/${productId}`,
			pageTitle: 'All Products',
			product
		});
	});
};

export const getIndex = (req: Request, res: Response) => {
	Product.fetchAll(products => {
		res.render('shop/index', {
			path: '/',
			pageTitle: 'Shop',
			prods: products
		});
	});
};

export const getCart = (req: Request, res: Response) => {
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your Cart '
	});
};

export const postCart = (req: Request, res: Response) => {
	const productId = req.params.productId;
	console.log(productId);
};

export const getOrders = (req: Request, res: Response) => {
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your Cart '
	});
};

export const getCheckout = (req: Request, res: Response) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout'
	});
};
