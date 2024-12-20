import { Request, Response } from 'express';
import { Comment, User } from '../models/index.js';


// GET /Comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const limit: number = parseInt(req.query.limit as string, 10) || 10;
    const offset: number = (page - 1) * limit;
    
    const comments = await Comment.findAll({
      limit,
      offset,
      include: {
        model: User,
        as: 'creatingUser',
        attributes: {exclude: ['password']}
      },
      attributes: {exclude: ['createdByUserId']},
    });
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Comments/:id
export const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id,{
      include: {
        model: User,
        as: 'creatingUser',
        attributes: {exclude: ['password']}
      },
      attributes: {exclude: ['createdByUserId']},
    });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Comments
export const createComment = async (req: Request, res: Response) => {
  const { content, calendarYear, calendarMonth, calendarDay, groupId, createdByUserId } = req.body;
  try {
    const newComment = await Comment.create({ content, calendarYear, calendarMonth, calendarDay, groupId, createdByUserId });
    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /Comments/:id
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.update(req.body);
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Comments/:id
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Comment deleted' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
