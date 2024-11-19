import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { GroupFactory } from './group.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Group = GroupFactory(sequelize);

User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });
Group.belongsTo(User, { foreignKey: 'hostUserId', as: 'hostUser' });

export { sequelize, User, Group };
