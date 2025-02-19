import fs from 'fs';
import path from 'path';
import { filePath } from 'utils';

type ProductType = {
	title: string;
};

export const products: ProductType[] = [];

export class Product {
	title: string;
	constructor(title: string) {
		this.title = title;
	}

	static fetchAll() {
		return products;
	}

	save() {
		const p = path.join(filePath, 'data', 'products.json');
		fs.readFile(p, (err, fileContent) => {
			let products: ProductType[] = [];
			if (!err) {
				products = JSON.parse(fileContent.toString());
			}
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), err => {
				console.log(err);
			});
		});
		products.push(this);
	}
}
