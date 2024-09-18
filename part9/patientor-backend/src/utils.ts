import { PatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }
  return comment;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (value: unknown): Gender => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error("Incorrect or missing gender: " + value);
  }
  return value;
};

export const toNewPatientEntry = (object: unknown): PatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: PatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect Data: some field are missing");
};
