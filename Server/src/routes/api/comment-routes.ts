import express from 'express';
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../../controllers/comment-controller.js';

const router = express.Router();

// GET /Comments - Get all Comments
router.get('/', getAllComments);

// GET /Comments/:id - Get a Comment by id
router.get('/:id', getCommentById);

// POST /Comments - Create a new Comment
router.post('/', createComment);

// PUT /Comments/:id - Update a Comment by id
router.put('/:id', updateComment);

// DELETE /Comments/:id - Delete a Comment by id
router.delete('/:id', deleteComment);

export { router as commentRouter };
