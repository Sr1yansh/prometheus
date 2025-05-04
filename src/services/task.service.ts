import Task from '../database/models/task';
import { CreateTaskParams, UpdateTaskParams } from '../constants/task.constants';
export const createTaskService = async (params: CreateTaskParams) => {
    const task = await Task.create(params);
    return task;
}

export const getTasksService = async (userId: number) => {
    const tasks = await Task.findAll({where : {userId}});
    return tasks;
}

export const getTaskByIdService = async (id: number, userId: number) => {
    const task = await Task.findOne({where : {id, userId}});
    return task;
}

export const updateTaskByIdService = async (params: UpdateTaskParams) => {
    const { id, userId, ...updateData } = params;
    const task = await Task.findOne({where : {id, userId}});
    if(!task) throw new Error('Task not found');
    await task.update(updateData);
    return task;
}
