import { Request, Response } from 'express';
import { User, Group, Comment } from '../models/index.js';


// GET /groups
export const getAllGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: 'hostUser', // Alias for the host user
          attributes: { exclude: ['password']},
        },
      ],
      attributes: { exclude: ['hostUserId']}
    });
    res.json(groups);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /groups/:id
export const getGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id,
      {
        include: [
          {
            model: User,
            as: 'hostUser', // Alias for the host user
            attributes: { exclude: ['password']},
          },
          {
            model: User,
            as: 'Users', // Alias for the associated group users
            attributes: { exclude: ['password']},
            through: { attributes: [] }, // Exclude fields from the join table (GroupUsers)
          },
        ],
        attributes: { exclude: ['hostUserId']}
      }
    );
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ message: 'group not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /groups/:groupId/comments
export const getGroupUsers = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const comments = await User.findAll({
      include: [
        {
          model: Group,
          where: { id: groupId },
          attributes: [],
          // through: { attributes: [] }, // Exclude fields from the join table (GroupUsers)
        }
      ],
    });
    if (comments) {
      res.json(comments);
    } else {
      res.status(404).json({ message: 'group not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// GET /groups/:groupId/comments
export const getGroupComments = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        as: 'creatingUser',
        attributes: {exclude: ['password']}
      },
      where: { groupId: groupId },
      attributes: {exclude: ['createdByUserId']}
    });
    if (comments) {
      res.json(comments);
    } else {
      res.status(404).json({ message: 'group not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


// POST /groups
export const createGroup = async (req: Request, res: Response) => {
  const { groupName, hostUserId } = req.body;
  try {
    const newGroup = await Group.create({ groupName, hostUserId });
    res.status(201).json(newGroup);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /groups/:id
export const updateGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { groupName, hostUserId } = req.body;
  try {
    const group = await Group.findByPk(id);
    if (group) {
      group.groupName = groupName;
      group.hostUserId = hostUserId;
      await group.save();
      res.json(group);
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /groups/:id
export const deleteGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id);
    if (group) {
      await group.destroy();
      res.json({ message: 'Group deleted' });
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
