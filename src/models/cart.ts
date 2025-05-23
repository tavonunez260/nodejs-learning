import fs from 'fs';
import path from 'path';

import { ProductType } from 'models';
import { filePath } from 'utils';

const file = path.join(filePath, 'data', 'cart.json');

export type CartType = {
	products: ProductType[];
	totalPrice: number;
};

export class Cart {
	products: ProductType[];
	totalPrice: number;

	constructor() {
		this.products = [];
		this.totalPrice = 0;
	}

	static addProduct(value: ProductType | undefined) {
		// Fetch the previous cart
		if (value) {
			fs.readFile(file, (err, fileContent) => {
				let cart: { products: ProductType[]; totalPrice: number } = { products: [], totalPrice: 0 };
				if (!err) {
					cart = JSON.parse(fileContent.toString());
				}

				// Analyze the cart => Find existing product
				const existingProductIndex = cart.products.findIndex(
					(product: ProductType) => product.id === value.id
				);
				const existingProduct: ProductType = cart.products[existingProductIndex];
				let updatedProduct: ProductType | null = null;

				// Add new product / increase quantity
				if (existingProduct) {
					updatedProduct = { ...existingProduct };
					updatedProduct.quantity += 1;
					cart.totalPrice += updatedProduct.price;
					cart.products[existingProductIndex] = updatedProduct;
				} else {
					updatedProduct = { ...value, quantity: 1 }; // Default quantity is 1
					cart.totalPrice += updatedProduct.price;
					cart.products.push(updatedProduct);
				}

				fs.writeFile(file, JSON.stringify(cart, null, 2), err => {
					if (err) {
						console.error('Error writing file:', err);
					} else {
						console.log('Product added to cart successfully!');
					}
				});
			});
		}
	}

	static deleteProduct(id: string, price: number) {
		fs.readFile(file, (err, fileContent) => {
			if (err) {
				console.error('Error reading file:', err);
				return;
			}

			const updatedCart = { ...fileContent } as unknown as CartType;
			const product = updatedCart.products.find(product => product.id === id);

			if (!product) {
				return;
			}

			updatedCart.products = updatedCart.products.filter(product => product.id !== id);
			updatedCart.totalPrice -= product ? price * product.quantity : 0;

			fs.writeFile(file, JSON.stringify(updatedCart, null, 2), err => {
				if (err) {
					console.error('Error writing file:', err);
				} else {
					console.log('Product deleted successfully!');
				}
			});
		});
	}

	static getCart(callback: (cart: CartType | null) => void) {
		fs.readFile(file, (err, fileContent) => {
			if (err) {
				callback(null);
			} else {
				const cart = JSON.parse(fileContent.toString());
				callback(cart);
			}
		});
	}
}
