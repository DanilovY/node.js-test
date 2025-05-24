import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  replaceStudentController,
} from '../controllers/studentsControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import express from 'express';

const router = Router();
const jsonParser = express.json();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

router.post('/students', ctrlWrapper(createStudentController));

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

router.put(
  '/students/:studentId',
  jsonParser,
  ctrlWrapper(replaceStudentController),
);

router.patch(
  '/students/:studentId',
  jsonParser,
  ctrlWrapper(patchStudentController),
);

export default router;
