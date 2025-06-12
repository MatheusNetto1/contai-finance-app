// app.ts
import express from 'express';
import 'reflect-metadata';
import launchRoutes from './routes/launch.routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/launches', launchRoutes);

export default app;