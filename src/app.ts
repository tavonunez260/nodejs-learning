import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';

config();
import { get404 } from 'controllers';
import { adminRoutes, shopRoutes } from 'routes';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
