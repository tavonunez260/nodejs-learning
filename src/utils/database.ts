import { Sequelize } from 'sequelize';
import { Product } from 'models';

export const sequelize = new Sequelize(
	process.env.DB_NAME ?? '',
	process.env.DB_USER ?? '',
	process.env.DB_PASSWORD,
	{ dialect: 'mysql', host: process.env.DB_HOST }
);
