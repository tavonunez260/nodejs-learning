import { Request, Response } from 'express';

import { Cart } from 'models/cart';
import { Product, ProductType } from 'models/products';

export const getProducts = async (req: Request, res: Response) => {
	const [rows] = await Product.fetchAll();
	res.render('shop/product-list', {
		path: '/products ',
		pageTitle: 'All Products',
		prods: rows
	});
};

export const getProduct = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	const [products] = await Product.findById(productId);
	res.render('shop/product-detail', {
		path: `/products/${productId}`,
		pageTitle: 'All Products',
		product: products[0]
	});
};

export const getIndex = async (req: Request, res: Response) => {
	const [products] = await Product.fetchAll();
	res.render('shop/index', {
		path: '/',
		pageTitle: 'Shop',
		prods: products[0]
	});
};

export const getCart = (req: Request, res: Response) => {
	Cart.getCart(async cart => {
		const [rows] = await Product.fetchAll();
		const cartProducts: ProductType[] = [];
		rows.forEach(product => {
			if (cart?.products) {
				const cartProduct = cart.products.find(p => p.id === product.id);
				if (cartProduct) {
					cartProducts.push(cartProduct);
				}
			}
		});
		res.render('shop/cart', {
			path: '/cart',
			pageTitle: 'Your Cart ',
			products: cartProducts
		});
	});
};

export const postCart = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	const [products] = await Product.findById(productId);
	Cart.addProduct(products[0]);
	res.redirect('/cart');
};

export const postDeleteCart = (req: Request, res: Response) => {
	const { id, price } = req.body.id;
	Cart.deleteProduct(id, price);
	res.redirect('/cart');
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
