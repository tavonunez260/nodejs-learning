import fs from 'fs';
import path from 'path';
import { filePath } from 'utils';

type ProductType = {
	title: string;
};

const dataDir = path.join(filePath, 'data');
const file = path.join(dataDir, 'products.json');

export const getProductsFromFile = (callback: (values: ProductType[]) => void) => {
	fs.readFile(file, (err, fileContent) => {
		if (err) {
			callback([]);
		} else {
			callback(JSON.parse(fileContent.toString()));
		}
	})
}

export class Product {
	title: string;
	constructor(title: string) {
		this.title = title;
	}

	static fetchAll(callback: (values: ProductType[]) => void) {
		getProductsFromFile(callback);
	}

	save() {
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
