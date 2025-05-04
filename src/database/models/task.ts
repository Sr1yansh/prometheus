'use strict';
import { Model, Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './index';

export type TTask = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
}

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public isCompleted!: boolean;
  public userId!: number;
  
  static associate(models: any) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  isCompleted: DataTypes.BOOLEAN,
  userId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Task',
});

export default Task;