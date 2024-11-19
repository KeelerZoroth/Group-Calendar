import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// import bcrypt from 'bcrypt';

interface GroupAttributes {
  id: number;
  groupname: string;
  hostUserId: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public groupname!: string;
  public hostUserId!: string;

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
      groupname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: 'Groups',
      sequelize,
    }
  );

  return Group;
}
