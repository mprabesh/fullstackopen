import patientData from "../data/patient";
import { NonSensitivePatientData, Patient, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const Data: Patient[] = patientData;

export const getAllPatient = (): NonSensitivePatientData[] => {
  return Data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (data: PatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...data,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};
