import User, { UserRole } from '../database/models/user';

export const findUserById = async (id: number) => {
    return await User.findByPk(id);
};

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

export const createUser = async (name: string, email: string, password: string, role: UserRole) => {
    return await User.create({ name, email, password, role: role ?? UserRole.USER });
}; 