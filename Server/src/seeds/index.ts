import { seedUsers } from './user-seeds.js';
import { seedGroups } from './group-seeds.js';
import { seedDayComments } from './comment-seeds.js';
import { seedGroupUsers } from './groupUsers-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedGroups();
    console.log('\n----- GROUPS SEEDED -----\n');

    await seedDayComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    
    await seedGroupUsers();
    console.log('\n----- GROUP-USERS SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
