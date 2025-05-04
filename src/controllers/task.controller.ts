import { Request, Response } from "express";
import {TTask} from '../database/models/task';
import { TUser } from '../database/models/user';
import { createTaskService, getTasksService, getTaskByIdService, updateTaskByIdService } from '../services/task.service';

declare global {
    namespace Express {
        interface Request {
            task?: TTask;
            user?: TUser;
        }
    }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const {title, description, isCompleted} = req.body
    try{
        const task = await createTaskService({title, description, isCompleted, userId: req.user!.id});
        res.status(201).json(task);
    } catch(err) {
        res.status(500).json({error : "Failed to create task"})
    }
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try{
        const tasks = await getTasksService(req.user!.id);
        res.status(201).json(tasks);
    } catch(err) {
        res.status(500).json({error : "Could not fetch the tasks"})
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try{
        const task = await getTaskByIdService(parseInt(id), req.user!.id);
        if(!task) {
            res.status(404).json({error: 'Task not found'});
            return;
        }
        res.status(201).json ({task, message : "Task found!"})
    } catch(err) {
        res.status(500).json({error : "Could not fetch the task"})
    }
}

export const updateTaskById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const {title, description, isCompleted} = req.body;
    try{
        const task = await updateTaskByIdService({id: parseInt(id), userId: req.user!.id, title, description, isCompleted}); 
        res.status(201).json(task);
    } catch(err) {
        res.status(500).json({error: 'Failed to update task'});
    }
}