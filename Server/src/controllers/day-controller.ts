import { Request, Response } from 'express';
import { User, Comment } from '../models/index.js';

// GET /Days
export const getAllDays = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll({
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


// DELETE /Days/:id
// export const deleteDay = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const day = await Day.findByPk(id);
//     if (day) {
//       await day.destroy();
//       res.json({ message: 'Day deleted' });
//     } else {
//       res.status(404).json({ message: 'Day not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
