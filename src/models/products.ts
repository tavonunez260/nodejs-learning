import fs from 'fs';
import { RowDataPacket } from 'mysql2';
import path from 'path';

import { Cart } from 'models';
import { db, filePath } from 'utils';

const file = path.join(filePath, 'data', 'products.json');

export type ProductType = {
	description: string;
	id: string | undefined;
	image_url: string;
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
	image_url: string;
	price: number;
	quantity: number;
	title: string;
	constructor(title: string, image_url: string, description: string, price: number, id?: string) {
		this.title = title;
		this.image_url = image_url;
		this.description = description;
		this.price = price;
		this.id = id;
		this.quantity = 1;
	}

	static deleteById(id: string) {
		getProductsFromFile(products => {
			const product = products.find(product => product.id === id);
			const updatedProducts = products.filter(product => product.id !== id);
			fs.writeFile(file, JSON.stringify(updatedProducts, null, 2), err => {
				if (err) {
					console.error('Error writing file:', err);
				} else {
					Cart.deleteProduct(product?.id ?? '', product?.price ?? 0);
					console.log('Product deleted successfully!');
				}
			});
		});
	}

	static async fetchAll() {
		return db.execute<ProductType[] & RowDataPacket[]>('SELECT * FROM products').then();
	}

	static findById(id: string) {
		return db.execute<ProductType[] & RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
	}

	save() {
		return db.execute(
			'INSERT INTO products (title, price, description, image_url) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.description, this.image_url]
		);
	}
}
