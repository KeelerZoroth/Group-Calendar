import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { GroupFactory } from './group.js';
import { CommentFactory } from './Comment.js';
import { GroupUsersFactory } from './groupUsers.js';

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
const Comment = CommentFactory(sequelize);
const GroupUsers = GroupUsersFactory(sequelize);


User.belongsToMany(Group, { through: GroupUsers, foreignKey: 'userId' });
Group.belongsToMany(User, { through: GroupUsers, foreignKey: 'groupId' });

User.hasMany(Group, { foreignKey: 'hostUserId', as: 'hostedGroups' });
Group.belongsTo(User, { foreignKey: 'hostUserId', as: 'hostUser' });

Group.hasMany(Comment, { foreignKey: 'groupId', as: 'DayComments' });
Comment.belongsTo(Group, { foreignKey: 'groupId', as: 'calendarGroup' });

Comment.belongsTo(User, {foreignKey: 'createdByUserId', as: 'creatingUser'});
User.hasMany(Comment, {foreignKey: 'createdByUserId', as: 'commentsCreated'});

export { sequelize, User, Group, Comment, GroupUsers };
