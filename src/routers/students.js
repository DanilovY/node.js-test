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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/studentsValidation.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
// import { ROLES } from '../constants/index.js';
// import { checkRoles } from '../middlewares/checkRoles.js';

const router = Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));

router.post(
  '/',
  jsonParser,
  upload.single('avatar'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));

router.put(
  '/:studentId',
  jsonParser,
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(replaceStudentController),
);

router.patch(
  '/:studentId',
  jsonParser,
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
