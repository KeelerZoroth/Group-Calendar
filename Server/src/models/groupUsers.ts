import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// import bcrypt from 'bcrypt';

interface GroupUsersAttributes {
  id: number;
  groupId: number;
  userId: number;
}

interface GroupUsersCreationAttributes extends Optional<GroupUsersAttributes, 'id'> {}

export class GroupUsers extends Model<GroupUsersAttributes, GroupUsersCreationAttributes> implements GroupUsersAttributes {
  static save() {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public groupId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GroupUsersFactory(sequelize: Sequelize): typeof GroupUsers{
  GroupUsers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: 'groupUsers',
      sequelize,
    }
  );

  return GroupUsers;
}
