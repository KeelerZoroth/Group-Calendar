import { Request, Response } from 'express';
import { Comment, Group, GroupUsers, User } from '../models/index.js';
import { Op } from 'sequelize';

// GET /Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    const where: {[key: string]: any} = {};
    if(username) {where.username = username}
    const users = await User.findAll({
      where: where,
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /users/:userId/groups
export const getUserGroups = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: 'hostUser', // Alias for the host user
          attributes: { exclude: ['password']},
        },
        {
          model: User,
          as: 'Users',
          attributes: [],
          through: { attributes: [] },
          where: { id: userId },
        },
      ],
      attributes: { exclude: ['hostUserId']}
    });
    res.json(groups);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /users/:userId/comments
export const getUserComments = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { createdByUserId: userId },
    });
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if(await User.count({where: { username } }) > 0){
      res.status(409).json({message: "username already exists"});
    } else {
      const newUser = await User.create({ username, password });
      res.status(201).json(newUser);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(req.body);
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      
      await Comment.destroy({
        where: {
          createdByUserId: user.id
        }
      });

      const allHostingGroupIds = (await Group.findAll({
        where: {
          hostUserId: user.id
        },
        attributes: ['id']
      })).map((row) => row.id);
      
      await GroupUsers.destroy({
        where: {
          [Op.or]: [
            { id: { [Op.in]: allHostingGroupIds } },
            { userId: user.id }
          ]
        }
      });

      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
