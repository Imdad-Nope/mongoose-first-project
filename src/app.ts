import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { promise } from 'zod';
const app : Application = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use('/api/v1', router)


const getAController = async (req: Request, res: Response) => {
  
  res.send("Hello")
}
// for (var i = 0; i < 3; i++) {
//   setTimeout(function() { alert(i); }, 1000 + i);
// }

app.get('/', getAController);

// Global Error handler ---

app.use(globalErrorHandler)

// Not found Api

app.use(notFound)

export default app;