import { TTask } from "../database/models/task";

export type CreateTaskParams = Omit<TTask, 'id'>;
export type UpdateTaskParams = Partial<Omit<TTask, 'userId'>> & { id: number; userId: number };