import { Comment } from '../models/Comment.js';

export const seedDayComments = async () => {
  await Comment.bulkCreate([
    { content: 'This is comment 1', calendarYear: 2024, calendarMonth: 1, calendarDay: 1, groupId: 1, createdByUserId: 1},
    { content: 'This is comment 2', calendarYear: 2024, calendarMonth: 1, calendarDay: 2, groupId: 1, createdByUserId: 1},
    { content: 'This is comment 3', calendarYear: 2024, calendarMonth: 1, calendarDay: 3, groupId: 1, createdByUserId: 1},
    { content: 'This is comment 4', calendarYear: 2024, calendarMonth: 1, calendarDay: 4, groupId: 1, createdByUserId: 1},
  ], { individualHooks: true });
};
