import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/students', StudentRoutes)


const getAController = (req: Request, res: Response) => {

  res.send("Hello")
}

app.get('/', getAController)

export default app;