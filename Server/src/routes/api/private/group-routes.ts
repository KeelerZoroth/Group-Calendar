import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupUsers,
  getGroupComments,
  addUserToGroup,
  getGroupDays,
  removeUserFromGroup,
  // getGroupDays,
} from '../../../controllers/group-controller.js';

const router = express.Router();

// GET /groups - Get all Groups
router.get('/', getAllGroups);

// GET /groups/:id - Get a Group by id
router.get('/:id', getGroupById);

// GET /groups/:id/users
router.get('/:groupId/users', getGroupUsers);

// GET /groups/:id/comments
router.get('/:groupId/comments', getGroupComments);

// GET /groups/:id/days
router.get('/:groupId/days', getGroupDays);

// POST /groups - Create a new Group
router.post('/', createGroup);

// POST /groups/:groupId/users/:userId
router.post('/:groupId/users/:userId', addUserToGroup);

// PUT /groups/:id - Update a Group by id
router.put('/:id', updateGroup);

// DELETE /groups/:id - Delete a Group by id
router.delete('/:id', deleteGroup);

// DELETE /groups/:groupId/user/:userId
router.delete('/:groupId/users/:userId', removeUserFromGroup);

export { router as groupRouter };
