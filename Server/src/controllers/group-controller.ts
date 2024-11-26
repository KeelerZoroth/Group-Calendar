import { Request, Response } from 'express';
import { User, Group, Comment, GroupUsers } from '../models/index.js';


// GET /groups
export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const { groupName, hostUserId } = req.query;
    const where: any = {};
    if(groupName) {where.groupName = groupName}
    if(hostUserId) {where.hostUserId = hostUserId}
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: 'hostUser', // Alias for the host user
          attributes: { exclude: ['password'] },
        },
      ],
      attributes: { exclude: ['hostUserId'] },
      where: where
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
            attributes: { exclude: ['password'] },
          },
          {
            model: User,
            as: 'Users', // Alias for the associated group users
            attributes: { exclude: ['password'] },
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

// GET /groups/:groupId/users
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
      attributes: { exclude: ['password'] }
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

// GET /groups/:groupId/days
export const getGroupDays = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { year, month, day } = req.query;
    const where: any = { groupId: groupId };
    if(year) {where.calendarYear = year}
    if(month) {where.calendarMonth = month}
    if(day) {where.calendarDay = day}

    const comments = await Comment.findAll({
      where: where,
      include: {
        model: User,
        as: 'creatingUser',
        attributes: {exclude: ['password']}
      },
      attributes: {exclude: ['createdByUserId']},
    });

    // this orginizes the comments to their set dates
    const organizedByDay = comments.reduce((calendarData: {[key: string]: any[]}, comment: any) => {
      const commentDate = `${comment.calendarMonth}/${comment.calendarDay}/${comment.calendarYear}`;
      if (!calendarData[commentDate]) {
        calendarData[commentDate] = [];
      }
      calendarData[commentDate].push({
        id: comment.id,
        content: comment.content,
        groupId: comment.groupId,
        creatingUser: comment.creatingUser,
      });
      return calendarData;
    }, {});

    res.json(organizedByDay);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// POST /groups
export const createGroup = async (req: Request, res: Response) => {
  const { groupName, hostUserId } = req.body;
  try {
    const newGroup = await Group.create({ groupName, hostUserId });
    await GroupUsers.create({ groupId: newGroup.id, userId: hostUserId })
    res.status(201).json(newGroup);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// POST /groups/:groupId/user/:userId
export const addUserToGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  try {
    await GroupUsers.create({ groupId: Number.parseInt(groupId), userId: Number.parseInt(userId) });
    res.status(201).json(`User:${userId} added to group:${groupId}`);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /groups/:id
export const updateGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id);
    if (group) {
      await group.update(req.body);
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
      await GroupUsers.destroy({
        where: {
          groupId: group.id
        }
      });
      await group.destroy();
      res.json({ message: 'Group deleted' });
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /groups/:groupId/user/:userId
export const removeUserFromGroup = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  try {
    await GroupUsers.destroy({
      where: { groupId: Number.parseInt(groupId), userId: Number.parseInt(userId) }
    });
    res.status(201).json(`User:${userId} removed from group:${groupId}`);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
