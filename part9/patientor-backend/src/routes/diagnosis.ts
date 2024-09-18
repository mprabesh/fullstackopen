import express from "express";
const diagnosisRouter = express.Router();
import diagnosisData from "../data/diagnosis";

diagnosisRouter.get("/", (req, res) => {
  res.status(200).json(diagnosisData);
});

export default diagnosisRouter;
