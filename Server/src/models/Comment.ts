import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';
import { Group } from './group.js';

interface CommentAttributes {
  id: number;
  content: string;
  calendarYear: number;
  calendarMonth: number;
  calendarDay: number;
  groupId: number;
  createdByUserId: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  static save() {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public content!: string;
  public calendarYear!: number;
  public calendarMonth!: number;
  public calendarDay!: number;
  public groupId!: number;
  public createdByUserId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CommentFactory(sequelize: Sequelize): typeof Comment {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calendarYear:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      calendarMonth:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      calendarDay:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Group,
          key: 'id',
        },
      },
      createdByUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      }
    },
    {
      tableName: 'comments',
      sequelize,
    }
  );

  return Comment;
}
