import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface GroupAttributes {
  id: number;
  groupName: string;
  hostUserId: number;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  static save() {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public groupName!: string;
  public hostUserId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GroupFactory(sequelize: Sequelize): typeof Group {
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      }
    },
    {
      tableName: 'groups',
      sequelize,
    }
  );

  return Group;
}
