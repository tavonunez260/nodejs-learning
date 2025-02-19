import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

import { adminRoutes } from 'routes/admin';
import { shopRoutes } from 'routes/shop';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
