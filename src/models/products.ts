import fs from 'fs';
import path from 'path';

import { filePath } from 'utils';

const file = path.join(filePath, 'data', 'products.json');

export type ProductType = {
	description: string;
	id: string | undefined;
	imageUrl: string;
	price: number;
	quantity: number;
	title: string;
};

export const getProductsFromFile = (callback: (values: ProductType[]) => void) => {
	fs.readFile(file, (err, fileContent) => {
		if (err) {
			callback([]);
		} else {
			callback(JSON.parse(fileContent.toString()));
		}
	});
};

export class Product {
	description: string;
	id: string | undefined;
	imageUrl: string;
	price: number;
	quantity: number;
	title: string;
	constructor(title: string, imageUrl: string, description: string, price: number, id?: string) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.id = id;
		this.quantity = 1;
	}

	static fetchAll(callback: (values: ProductType[]) => void) {
		getProductsFromFile(callback);
	}

	static findById(id: string, callback: (product: ProductType | undefined) => void) {
		getProductsFromFile(products => {
			const foundProduct = products.find(product => (product.id = id));
			callback(foundProduct);
		});
	}

	save() {
		getProductsFromFile(products => {
			if (this.id) {
				const existingProductIndex = products.findIndex(product => product.id === this.id);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(file, JSON.stringify(updatedProducts, null, 2), err => {
					if (err) {
						console.error('Error writing file:', err);
					} else {
						console.log('Product saved successfully!');
					}
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(file, JSON.stringify(products, null, 2), err => {
					if (err) {
						console.error('Error writing file:', err);
					} else {
						console.log('Product saved successfully!');
					}
				});
			}
		});
	}
}
