import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const students = await StudentsCollection(payload);
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
