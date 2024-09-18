import express from "express";
const patientRouter = express.Router();
import { getAllPatient, addPatient } from "../services/patient";
import { toNewPatientEntry } from "../utils";

patientRouter.get("/", (req, res) => {
  res.status(200).json(getAllPatient());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const newEntry = addPatient(newPatient);
    res.status(200).json(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
