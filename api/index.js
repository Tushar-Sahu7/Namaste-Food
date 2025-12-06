import express from 'express';
import cors from 'cors';
import menuRouter from './menu.js';
import restaurantRouter from './restaurant.js';

const app = express();
app.use(cors());
app.use(express.json());

// Use the routers
app.use('/api', menuRouter);
app.use('/api', restaurantRouter);

export default app;
