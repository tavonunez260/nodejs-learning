import { DataTypes } from 'sequelize';

import { sequelize } from 'utils';

export const Product = sequelize.define('product', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},
	imageUrl: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export type ProductType = {
	description: string;
	id: string | undefined;
	imageUrl: string;
	price: number;
	quantity: number;
	title: string;
};
