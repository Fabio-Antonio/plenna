import express from 'express';
import * as environment from 'dotenv';
import cors from 'cors';
import { healthRouter } from './common/presentation/health.router';
import { doctorRouter } from './doctors/presenter/doctors.router';
import { userRouter } from './patients/presenter/user.router';

environment.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/users', userRouter);

app.use('', healthRouter);

const server = app.listen(process.env.PORT, () =>
  console.info('server is runing on port', process.env.PORT)
);

module.exports = { app, server };
