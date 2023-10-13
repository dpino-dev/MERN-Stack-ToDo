import {Router} from 'express'
import { createOneTask, deleteTask, getAllTasks, getOneTask, updateTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/api/tasks', getAllTasks)

router.get('/api/tasks/:id', getOneTask)

router.post('/api/tasks', createOneTask)

router.put('/api/tasks/:id', updateTask)

router.delete('/api/tasks/:id', deleteTask)



export default router;