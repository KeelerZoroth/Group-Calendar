import { Group } from '../models/group.js';

export const seedGroups = async () => {
  await Group.bulkCreate([
    { groupName: 'TestGroup', hostUserId: 1},
  ], { individualHooks: true });
};
