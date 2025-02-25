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

export const getCheckout = (req: Request, res: Response) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout'
	});
};
