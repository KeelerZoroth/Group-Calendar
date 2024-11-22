import { GroupUsers } from '../models/groupUsers.js';

export const seedGroupUsers = async () => {
  await GroupUsers.bulkCreate([
    { groupId: 1, userId: 1},
    { groupId: 1, userId: 2},
    { groupId: 1, userId: 3},
  ], { individualHooks: true });
};
