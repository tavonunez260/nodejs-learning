import fs from 'fs';
import path from 'path';

import { filePath } from 'utils';

const file = path.join(filePath, 'data', 'products.json');

export const getProductsFromFile = (callback: (values: Product[]) => void) => {
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
	title: string;
	constructor(title: string, imageUrl: string, description: string, price: number) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	static fetchAll(callback: (values: Product[]) => void) {
		getProductsFromFile(callback);
	}

	static findById(id: string, callback: (product: Product | undefined) => void) {
		getProductsFromFile(products => {
			const foundProduct = products.find(product => (product.id = id));
			callback(foundProduct);
		});
	}

	save() {
		this.id = Math.random().toString();
		getProductsFromFile(products => {
			products.push(this);

			// ✅ Write updated products array to file
			fs.writeFile(file, JSON.stringify(products, null, 2), err => {
				if (err) {
					console.error('Error writing file:', err);
				} else {
					console.log('Product saved successfully!');
				}
			});
		});
	}
}
