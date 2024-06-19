import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app : Application = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use('/api/v1', router)


const getAController = (req: Request, res: Response) => {

  res.send("Hello")
}

app.get('/', getAController);

// Global Error handler ---

app.use(globalErrorHandler)

// Not found Api

app.use(notFound)

export default app;