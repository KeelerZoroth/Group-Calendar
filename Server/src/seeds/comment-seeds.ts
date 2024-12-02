import { Comment } from '../models/Comment.js';

export const seedDayComments = async () => {
  await Comment.bulkCreate([
    { content: 'You can input any text you want!', calendarYear: 2024, calendarMonth: 12, calendarDay: 1, groupId: 1, createdByUserId: 1},
    { content: 'Somthing simple like "My Birthday" or a big string of text.', calendarYear: 2024, calendarMonth: 12, calendarDay: 2, groupId: 1, createdByUserId: 1},
    { content: 'Orginize your time with Group Calanders!', calendarYear: 2024, calendarMonth: 12, calendarDay: 3, groupId: 1, createdByUserId: 1},
    { content: 'It'+ "'" +'s time to see whats going on all the time.', calendarYear: 2024, calendarMonth: 12, calendarDay: 4, groupId: 1, createdByUserId: 1},
  ], { individualHooks: true });
};
