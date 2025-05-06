import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';

config();

import { get404 } from 'controllers';
import { adminRoutes, shopRoutes } from 'routes';
import { sequelize } from 'utils';
import { registerModels } from 'models/register';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
//
// app.use(get404);

registerModels();
sequelize
	.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log('Server running on port 3000');
		});
	})
	.catch(err => {
		console.error('Sequelize sync error:', err);
	});
