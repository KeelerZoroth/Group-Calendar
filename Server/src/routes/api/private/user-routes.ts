import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserGroups,
  getUserComments,
} from '../../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// GET /users/:id/groups
router.get('/:userId/groups', getUserGroups);

// GET /users/:id/comments
router.get('/:userId/comments', getUserComments);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

export { router as userRouter };
