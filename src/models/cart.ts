import { Product } from 'models';
import path from 'path';
import { filePath } from 'utils';

const file = path.join(filePath, 'data', 'cart.json');

export class Cart {
	products: Product[];
	totalPrice: number;

	constructor() {
		this.products = [];
		this.totalPrice = 0;
	}

	static addProduct(productId) {

	}
}
