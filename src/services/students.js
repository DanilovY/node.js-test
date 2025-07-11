import { SORT_ORDER } from '../constants/index.js';
import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  ownerId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();

  studentsQuery.where('ownerId').equals(ownerId);

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    studentsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const studentsCount = await StudentsCollection.find()
    .merge(studentsQuery)
    .countDocuments();

  const students = await studentsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const students = await StudentsCollection.create(payload);
  return students;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });
  return student;
};

// export const updateStudent = async (studentId, payload, options = {}) => {
//   const rawResult = await StudentsCollection.findOneAndUpdate(
//     { _id: studentId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );
//   if (!rawResult || !rawResult.value) return null;
//   return {
//     student: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };

//put и patch

export const updateStudent = async (studentId, payload) => {
  const result = await StudentsCollection.findByIdAndUpdate(
    studentId,
    payload,
    { new: true },
  );
  return result;
};

export const replaceStudent = async (studentId, student) => {
  // student это тот же payload
  const result = await StudentsCollection.findByIdAndUpdate(
    studentId,
    student,
    { new: true, upsert: true, includeResultMetadata: true },
  );
  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
};
