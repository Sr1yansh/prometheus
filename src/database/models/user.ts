'use strict';
import { Model, ModelStatic, Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from './index';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}


export type TUser = {
    id: number;
    name: string;
    email: string;
    role: string;
}

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  // public password!: string;
  public role!: string;
  static associate(models: any) {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks'
    });
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false
  }  
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt)
    }
  }
});

export default User;