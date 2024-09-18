"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getAllPatient = void 0;
const patient_1 = __importDefault(require("../data/patient"));
const uuid_1 = require("uuid");
const Data = patient_1.default;
const getAllPatient = () => {
    return Data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getAllPatient = getAllPatient;
const addPatient = (data) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, data);
    patient_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
