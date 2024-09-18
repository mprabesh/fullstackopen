"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientRouter = express_1.default.Router();
const patient_1 = require("../services/patient");
patientRouter.get("/", (req, res) => {
    res.status(200).json((0, patient_1.getAllPatient)());
});
patientRouter.post("/", (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newEntry = (0, patient_1.addPatient)({ name, dateOfBirth, ssn, gender, occupation });
    res.json(newEntry);
});
exports.default = patientRouter;
