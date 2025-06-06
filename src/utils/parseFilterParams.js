const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  if (!isString) return;
  const isGender = (gender) => ['male', 'female', 'other'].includes(gender);
  if (isGender(gender)) return gender;
};

const parsedNumber = (number) => {
  const isNumber = typeof number === 'string';
  if (!isNumber) return;
  const parsNumder = parseInt(number);
  if (Number.isNaN(parsNumder)) return;
  return parsNumder;
};

export const parseFilterParams = (query) => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;
  const parsedGender = parseGender(gender);
  const parsedMaxAge = parsedNumber(maxAge);
  const parsedMinAge = parsedNumber(minAge);
  const parsedMaxAvgMark = parsedNumber(maxAvgMark);
  const parsedMinAvgMark = parsedNumber(minAvgMark);
  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};
