import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
	process.env.DB_NAME ?? '',
	process.env.DB_USER ?? '',
	process.env.DB_PASSWORD,
	{ dialect: 'mysql', host: process.env.DB_HOST }
);

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

export const db = pool.promise();
